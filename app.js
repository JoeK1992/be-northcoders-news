const express = require("express");
const apiRouter = require("./routes/apiRouter");
const app = express();
const {
  handlePsqlErrors,
  handleServerErrors,
} = require("./errorHandlingFunctions/errorFunctions");

app.use(express.json());

app.use(express.static("public"));

app.use("/api", apiRouter);

app.use(handlePsqlErrors);
app.use(handleServerErrors);

module.exports = app;
