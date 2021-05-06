const express = require("express");
const apiRouter = require("./routes/apiRouter");
const fetchAllEndpoints = require("./endpointsJSONfunction");

const app = express();
const {
  handlePsqlErrors,
  handleServerErrors,
} = require("./errorHandlingFunctions/errorFunctions");

app.get("", (req, res) => {
  request(
    { url: "https://be-nc-news-jk.herokuapp.com" },
    (error, response, body) => {
      if (error || response.statusCode !== 200) {
        return res.status(500).json({ type: "error", message: err.message });
      }

      res.json(JSON.parse(body));
    }
  );
});

app.use(express.json());

app.use("/api", apiRouter);

app.use(handlePsqlErrors);
app.use(handleServerErrors);

module.exports = app;
