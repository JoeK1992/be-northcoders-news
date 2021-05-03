const topicsRouter = require("express").Router();

const { getTopics } = require("../controllers/topicsController");
const { handle405Errors } = require("../errorHandlingFunctions/errorFunctions");

topicsRouter.route("/").get(getTopics).all(handle405Errors);

module.exports = topicsRouter;
