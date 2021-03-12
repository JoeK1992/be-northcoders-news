const express = require("express");
const apiRouter = require("./routes/apiRouter");
const app = express();
const {
  handleCustomErrors,
  handlePsqlErrors,
  handleServerErrors,
} = require("./errorHandlingFunctions");

app.use("/api", apiRouter);

app.use(handleCustomErrors);
app.use(handlePsqlErrors);
app.use(handleServerErrors);

module.exports = app;
