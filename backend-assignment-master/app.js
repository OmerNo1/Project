const createError = require("http-errors");
const mongoose = require("mongoose");
const express = require("express");
const path = require("path");
const logger = require("morgan");

const aboutRouter = require("./routes/about");
const addCostRouter = require("./routes/addcost");
const reportRouter = require("./routes/report");

const app = express();
const url = `mongodb+srv://OmerNorman:fHZdpDrHkaEI9eex@cluster0.5rmvbkd.mongodb.net/`;
//mongodb+srv://OmerNorman:fHZdpDrHkaEI9eex@cluster0.5rmvbkd.mongodb.net/

mongoose.set("strictQuery", false);
// connect to mongodb
async function connectToDatabase() {
  //This defines an async function connectToDatabase that attempts to connect to a MongoDB database at the specified URL using the mongoose.connect() function.
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to the database!");
  } catch (error) {
    console.log(error);
  }
}
//connect to database
connectToDatabase();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));


app.use("/about", aboutRouter);
app.use("/addcost", addCostRouter);
app.use("/report", reportRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
