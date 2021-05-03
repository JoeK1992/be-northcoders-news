const usersRouter = require("express").Router();

const {
  getUsers,
  getUserByUsername,
} = require("../controllers/usersController");

const { handle405Errors } = require("../errorHandlingFunctions/errorFunctions");

usersRouter.route("/").get(getUsers);

usersRouter.route("/:username").get(getUserByUsername).all(handle405Errors);

module.exports = usersRouter;
