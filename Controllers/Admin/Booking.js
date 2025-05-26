const Booking = require("../../Models/booking");
const Show = require("../../Models/show");
const ExpressError = require("../../Utils/ExpressError");

module.exports.getBookingsOfShow = async (req, res) => {
    const showId = req.params.showId;
    const show = await Show.findById(showId);
    if (!show) {
        throw new ExpressError(404, "Show not found");
    }

    if (!show.admin.equals(req.user.id)) {
      throw new ExpressError(404, "You are not the admin of this show");
    }

    const bookings = await Booking.find({ show: show._id })
        .populate("seats")
        .populate("user");
    
    
    res.status(200).json(bookings);

}