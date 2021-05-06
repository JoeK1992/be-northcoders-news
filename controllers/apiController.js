const { fetchApiJSON } = require("../models/apiModel");

exports.getApiJSON = (req, res, next) => {
  fetchApiJSON()
    .then((apiJSON) => {
      return res.status(200).send(apiJSON);
    })
    .catch(next);
};
