const apiRouter = require("express").Router();
const topicsRouter = require("./topicsRouter");
const usersRouter = require("./usersRouter");
const articlesRouter = require("./articlesRouter");
const commentsRouter = require("./commentsRouter");
const handle405Errors = require("../errorHandlingFunctions/errorFunctions");
const getApiJSON = require("../controllers/apiController");

apiRouter.use("/topics", topicsRouter);

apiRouter.use("/users", usersRouter);

apiRouter.use("/articles", articlesRouter);

apiRouter.use("/comments", commentsRouter);

apiRouter.route("/").get(getApiJSON).all(handle405Errors);

module.exports = apiRouter;
