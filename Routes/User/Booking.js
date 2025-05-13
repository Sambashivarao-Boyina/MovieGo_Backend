const express = require("express");
const IsAutheticated = require("../../MiddleWares/IsAutheticated");
const isUser = require("../../MiddleWares/isUser");
const WrapAsync = require("../../Utils/WrapAsync");
const { createBooking, getBookingDetails, cancelBooking, checkoutBooking } = require("../../Controllers/User/Booking.js");
const { validateBooking } = require("../../Utils/Validatations.js");
const router = express.Router();

router.post("/", IsAutheticated, isUser, validateBooking, WrapAsync(createBooking));
router.get("/:bookingId", IsAutheticated, isUser, WrapAsync(getBookingDetails));
router.delete("/:bookingId", IsAutheticated, isUser, WrapAsync(cancelBooking));
router.patch("/checkout/:paymentId", IsAutheticated, isUser, WrapAsync(checkoutBooking));


module.exports = router;