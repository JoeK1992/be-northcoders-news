const express = require("express");
const apiRouter = require("./routes/apiRouter");
const JSONRouter = require("../be-nc-news/routes/JSONRouter");
const cors = require("cors");

const app = express();
const {
  handlePsqlErrors,
  handleServerErrors,
} = require("./errorHandlingFunctions/errorFunctions");

app.use(cors());

app.use(express.json());

app.use("", JSONRouter);

app.use("/api", apiRouter);

app.use(handlePsqlErrors);
app.use(handleServerErrors);

module.exports = app;
