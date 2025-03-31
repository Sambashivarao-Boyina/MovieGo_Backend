const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");

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


app.use(cors({ origin: "*" }));
app.use(express.json());


//routes
//admin
const adminAuthRouter = require("./Routes/Admin/AdminAuth");
const adminRouter = require("./Routes/Admin/Admin");
const theaterRouter = require("./Routes/Admin/Theater");
const screenRouter = require("./Routes/Admin/Screen");
const movieRouter = require("./Routes/Admin/Movies");
const showRouter = require("./Routes/Admin/Show");

//User
const userAuthRouter = require("./Routes/User/UserAuth");
const userRouter = require("./Routes/User/User");
const userMovieRouter = require("./Routes/User/Movie");
const userShowsRouter = require("./Routes/User/Show");

app.use("/api/admin", adminRouter);
app.use("/api/admin/auth", adminAuthRouter);
app.use("/api/admin/theater", theaterRouter);
app.use("/api/admin/screen", screenRouter)
app.use("/api/admin/movie", movieRouter);
app.use("/api/admin/show", showRouter);

app.use("/api/user", userRouter);
app.use("/api/user/auth", userAuthRouter);
app.use("/api/user/movie", userMovieRouter);
app.use("/api/user/show", userShowsRouter); 

app.use((err, req, res, next) => {
  let { status = 500, message = "Internal ServerError" } = err;
  console.log(err);
  res.status(status).json({ message: message });
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
