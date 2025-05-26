const { Schema } = require("mongoose");
const Admin = require("../../Models/admin");
const Theater = require("../../Models/theater");
const ExpressError = require("../../Utils/ExpressError");
const Show = require("../../Models/show");
const Seat = require("../../Models/seat");

module.exports.createShow = async (req, res, next) => {
  const admin = await Admin.findById(req.user.id);

  if (!admin) {
    throw new ExpressError(404, "Admin not found");
  }

  const theater = await Theater.findById(req.body.theater);

  if (!theater) {
    throw new ExpressError(404, "Theater Not found");
  }

  if (admin.theaters.indexOf(req.body.theater) === -1) {
    throw new ExpressError(404, "You doest have this Theater");
  }

  if (theater.screens.indexOf(req.body.screen) === -1) {
    throw new ExpressError(404, "This screen is not in the theater");
  }

  if (admin.movies.indexOf(req.body.movie) === -1) {
    throw new ExpressError(404, "You does't have this movie");
  }

  const show = new Show(req.body);
  show.admin = admin._id;

  const seatIds = [];

  for (let row = "A".charCodeAt(0); row <= "N".charCodeAt(0); row++) {
    for (let col = 1; col <= 20; col++) {
      const seatCode = String.fromCharCode(row) + col;
      const seat = new Seat({ seatCode });
      await seat.save();
      seatIds.push(seat._id);
    }
  }

  show.seats = seatIds;
  await show.save();

  res.status(201).json({ message: "Show is created" });
};

module.exports.getShowsList = async (req, res, next) => {
  let shows = await Show.find({ admin: req.user.id })
    .populate("movie")
    .populate("theater")
    .populate("screen")
    .populate({
      path: "seats",
      select: "status", // minimize data
    });
  
  

  res.status(200).json(shows);
};

module.exports.getShow = async (req, res, next) => {
  const show = await Show.findById(req.params.showId)
    .populate("seats")
    .populate("theater")
    .populate("movie")
    .populate("screen");

 
 

  if (!show) {
    throw new ExpressError(404, "Show not found");
  }

  if (!show.admin.equals(req.user.id)) {
    throw new ExpressError(401, "You are not the Admin of the Show");
  }

  res.status(201).json(show);
};

module.exports.closeExpiredShows = async () => {
  try {
    const shows = await Show.find({ bookingStatus: "Open" });
    const now = new Date();

    for (const show of shows) {
      const dateParts = show.date.split("-");
      const timeParts = show.showTime.split(" ");
      const [hours, minutes] = timeParts[0].split(":");
      const meridian = timeParts[1];

      let hour = parseInt(hours);
      if (meridian === "PM" && hour !== 12) hour += 12;
      if (meridian === "AM" && hour === 12) hour = 0;

      // Create a Date object from show.date and showTime
      const showDateTime = new Date(
        `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}T${hour
          .toString()
          .padStart(2, "0")}:${minutes}:00`
      );

      // Subtract 1 hour from the show time
      const closeTime = new Date(showDateTime.getTime() - 60 * 60 * 1000);

      // If current time is after closeTime, update bookingStatus to Closed
      if (now >= closeTime) {
        show.bookingStatus = "Closed";
        await show.save();
      }
    }
  } catch (error) {
    console.error("Error closing expired shows:", error);
  }
};

module.exports.closeShowBookings = async (req, res) => {
  const showId = req.params.showId;
  let show = await Show.findById(showId);
  if (!show) {
    throw new ExpressError(404, "Show not found");
  }

  if (!show.admin.equals(req.user.id)) {
    throw new ExpressError(401, "You are not the Admin of the Show");
  }

  show.bookingStatus = "Closed";

  await show.save();

  show = await Show.findById(req.params.showId)
    .populate("seats")
    .populate("theater")
    .populate("movie")
    .populate("screen");

  res.status(201).json(show);
};

module.exports.openShowBooking = async (req, res) => {
  const showId = req.params.showId;
  const now = new Date();

  let show = await Show.findById(showId);
  if (!show) {
    throw new ExpressError(404, "Show not found");
  }

  if (!show.admin.equals(req.user.id)) {
    throw new ExpressError(401, "You are not the Admin of the Show");
  }

  const dateParts = show.date.split("-");
  const timeParts = show.showTime.split(" ");
  const [hours, minutes] = timeParts[0].split(":");
  const meridian = timeParts[1];

  let hour = parseInt(hours);
  if (meridian === "PM" && hour !== 12) hour += 12;
  if (meridian === "AM" && hour === 12) hour = 0;

  // Create a Date object from show.date and showTime
  const showDateTime = new Date(
    `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}T${hour
      .toString()
      .padStart(2, "0")}:${minutes}:00`
  );

  // Subtract 1 hour from the show time
  const closeTime = new Date(showDateTime.getTime() - 60 * 60 * 1000);

  // If current time is after closeTime, update bookingStatus to Closed
  if (now >= closeTime) {
    show.bookingStatus = "Closed";
    await show.save();

    throw new ExpressError(404, "Show is Closed permanently");
  }

  show.bookingStatus = "Open";

  await show.save();

  show = await Show.findById(req.params.showId)
    .populate("seats")
    .populate("theater")
    .populate("movie")
    .populate("screen");

  res.status(201).json(show);
};
