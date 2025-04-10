const Seat = require("../../Models/seat");

module.exports.cleanUpExpiredSeats = async () => {
  const now = new Date();
  try {
    const result = await Seat.updateMany(
      {
        status: "Processing",
        processingUntil: { $lt: now },
      },
      {
        $set: { status: "Available" },
        $unset: { bookedBy: "", processingUntil: "" },
      }
    );
  } catch (err) {
    console.error("Error during seat cleanup:", err);
  }
};

