const Booking = require("../../Models/booking");
const Seat = require("../../Models/seat");
const Show = require("../../Models/show");
const User = require("../../Models/user");
const ExpressError = require("../../Utils/ExpressError");
const axios = require("axios");

module.exports.createBooking = async (req, res) => {
  const { showId, selectedSeats } = req.body;
  const HOLD_TIME = 6 * 60 * 1000;

  const result = await Seat.updateMany(
    {
      _id: { $in: selectedSeats },
      status: "Available",
    },
    {
      $set: {
        status: "Processing",
        bookedBy: req.user.id,
        processingUntil: new Date(Date.now() + HOLD_TIME),
      },
    }
  );

  const show = await Show.findById(showId);

  if (result.matchedCount === selectedSeats.length) {
    const ticketCost = Math.round(show.ticketCost * 100) / 100;
    const totalBookingCost =
      Math.round(
       ( (show.ticketCost * selectedSeats.length) +
          (show.ticketCost * selectedSeats.length * 0.1)) * 100
      ) / 100;

    const booking = new Booking({
      show: showId,
      bookingStatus: "Processing",
      user: req.user.id,
      seats: selectedSeats,
      processingUntil: new Date(Date.now() + HOLD_TIME),
      ticketCost,
      totalBookingCost,
    });


    const savedBooking = await booking.save();

    return res.status(200).json({ bookingId: savedBooking._id });
  } else {
    await Seat.updateMany(
      { bookedBy: req.user.id, status: "Processing" },
      {
        $set: { status: "Available" },
        $unset: { bookedBy: "", processingUntil: "" },
      }
    );

    throw new ExpressError(
      409,
      "Some seats are no longer available. Please try again."
    );
  }
};

module.exports.getBookingDetails = async (req, res) => {
  const bookingId = req.params.bookingId;
  if (!bookingId) {
    throw new ExpressError(404, "Booking Id not found");
  }

  const booking = await Booking.findById(bookingId)
    .populate({
      path: "show",
      select: "-seats",
      populate: "movie theater screen",
    })
    .populate("user")
    .populate("seats");

  res.status(200).json(booking);
};

module.exports.cancelBooking = async (req, res) => {
  const bookingId = req.params.bookingId;
  const booking = await Booking.findById(bookingId);
  await Seat.updateMany(
    { _id: { $in: booking.seats } },
    {
      $set: { status: "Available" },
      $unset: { bookedBy: "", processingUntil: "" },
    }
  );

  await Booking.findByIdAndDelete(bookingId);

  res.status(200).json({ message: "Successfully Deleted" });
};

const refreshPayment = async (paymentId) => {
  try {
    await axios.post(
      `https://api.razorpay.com/v1/payments/${paymentId}/refund`,
      {
        auth: {
          username: process.env.RAZOR_PAY_KEY_ID,
          password: process.env.RAZOR_PAY_SECRET_KEY,
        },
      }
    );
  } catch (error) {
    console.log(error);
  }
};

module.exports.checkoutBooking = async (req, res) => {
  const paymentId = req.params.paymentId;
  const response = await axios.get(
    `https://api.razorpay.com/v1/payments/${paymentId}`,
    {
      auth: {
        username: process.env.RAZOR_PAY_KEY_ID,
        password: process.env.RAZOR_PAY_SECRET_KEY,
      },
    }
  );

  const payment = response.data;

  const booking = await Booking.findById(payment.notes.bookingId);

  if (!booking) {
    await refreshPayment(paymentId);
    return res.status(404).json({ error: "Booking not found" });
  }

  const lockedSeats = await Seat.find({
    _id: { $in: booking.seats },
  });

  const areSeatsAvailable = lockedSeats.every(
    (seat) =>
      seat.status === "Processing" &&
      seat.bookedBy.toString() === booking.user.toString()
  );

  if (!areSeatsAvailable) {
    // Seats already booked by someone else
    booking.bookingStatus = "Canceled";
    booking.paymentId = payment.id;
    await booking.save();

    await refreshPayment(paymentId);
    return res.status(409).json({
      message:
        "Payment received but seats are no longer available. Refund will be processed.",
    });
  }

  await Seat.updateMany(
    { _id: { $in: booking.seats } },
    {
      $set: { status: "Booked" },
      $unset: { bookedBy: req.user.id, processingUntil: "" },
    }
  );

  booking.paymentId = payment.id;
  booking.bookingStatus = "Success";

  await booking.save();

  res.status(200).json({ message: "Tickets are booked" });
};

module.exports.getBookingsList = async (req, res) => {
  const bookings = await Booking.find({ user: req.user.id })
    .populate({
      path: "show",
      select: "-seats",
      populate: "movie theater screen",
    })
    .populate("user")
    .populate("seats");

  res.status(200).json(bookings);
};

module.exports.clearProcessingBookings = async () => {
  const now = new Date();
  try {
    await Booking.deleteMany({
      bookingStatus: "Processing",
      paymentId: null,
      processingUntil: { $lt: now },
    });
  } catch (error) {}
};
