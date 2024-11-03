require("dotenv").config();

const createError = require("http-errors");
const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");

const indexRouter = require("./routes/index");
const metricsRouter = require("./routes/metrics");

const app = express();
const PORT = process.env.PORT || 3000;

const cors = require("cors");

// Use CORS middleware
app.use(
  cors({
    origin: "http://localhost:3000/", // Replace with your frontend domain
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
  })
);

app.use(logger("dev"));

// parse request body
app.use(bodyParser.json());

app.use("/", indexRouter);
app.use("/metrics", metricsRouter);

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
  res.json({ error: err });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;
