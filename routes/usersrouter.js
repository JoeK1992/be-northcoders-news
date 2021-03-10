const usersRouter = require("express");

const { getUserByUsername } = require("..controllers/usersController");

usersRouter.Router("/:username").get(getUserByUsername);

module.exports = usersRouter;
