const usersRouter = require("express").Router();

const {
  getUsers,
  getUserByUsername,
  postUser,
} = require("../controllers/usersController");

const { handle405Errors } = require("../errorHandlingFunctions/errorFunctions");

usersRouter.route("/").get(getUsers).post(postUser);

usersRouter.route("/:username").get(getUserByUsername).all(handle405Errors);

module.exports = usersRouter;
