const Booking = require("../../Models/booking");
const Seat = require("../../Models/seat");
const User = require("../../Models/user");
const ExpressError = require("../../Utils/ExpressError");
const axios = require("axios");

module.exports.createBooking = async (req, res) => {
  const { showId, selectedSeats } = req.body;
  const HOLD_TIME = 5 * 60 * 1000;

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

  if (result.matchedCount === selectedSeats.length) {
    const booking = new Booking({
      show: showId,
      bookingStatus: "Processing",
      user: req.user.id,
      seats: selectedSeats,
    });

    const savedBooking = await booking.save();
    
    return res.status(200).json({bookingId: savedBooking._id});
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

  const booking = await Booking.findById(bookingId).populate({
    path: "show",
    select: "-seats",
    populate:"movie theater screen"
  })
    .populate("user")
    .populate("seats");


  res.status(200).json(booking);
}

module.exports.cancelBooking = async (req, res) => {
  const bookingId = req.params.bookingId;
  const booking = await Booking.findById(bookingId);
  const updatedSeats = await Seat.updateMany(
    { _id: { $in: booking.seats } },
    {
      $set: { status: "Available" },
      $unset: { bookedBy: "", processingUntil: "" },
    }
  );

  await Booking.findByIdAndDelete(bookingId);

  res.status(200).json({ message: "Successfully Deleted" });
}


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

  const updatedSeats = await Seat.updateMany(
    { _id: { $in: booking.seats } },
    {
      $set: { status: "Booked" },
      $unset: { bookedBy: req.user.id, processingUntil: "" },
    }
  );

  booking.paymentId = payment.id;
  booking.status = "Success";


  await booking.save();

  res.status(200).json({ message: "Tickets are booked" });

}