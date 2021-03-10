const { fetchUserByUsername } = require("..models/usersModel");

exports.getUserByUsername = (req, res, next) => {
  getUserByUsername().then((user) => {
    res.status(200).send({ user });
  });
};
