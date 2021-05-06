const { fetchJSON } = require("../models/JSONModel");

exports.getJSON = (req, res, next) => {
  fetchJSON()
    .then((JSON) => {
      res.status(200).send({ JSON });
    })
    .catch(next);
};
