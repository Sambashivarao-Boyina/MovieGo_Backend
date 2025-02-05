const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();
const PORT = process.env.PORT;
const DATABASE_URL = process.env.MONGO_DB;

async function main() {
  await mongoose.connect(DATABASE_URL);
}

main()
  .then(() => {
    console.log("Connected to database");
  })


app.use(express.json());


//routes
const adminAuthRouter = require("./Routes/Admin/AdminAuth");

app.use("/api/admin/auth", adminAuthRouter);

app.use((err, req, res, next) => {
  let { status = 500, message = "Internal ServerError" } = err;
  res.status(status).json({ message: message });
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
