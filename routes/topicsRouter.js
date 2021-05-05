const topicsRouter = require("express").Router();

const { getTopics, postTopic } = require("../controllers/topicsController");
const { handle405Errors } = require("../errorHandlingFunctions/errorFunctions");

topicsRouter.route("/").get(getTopics).post(postTopic).all(handle405Errors);

module.exports = topicsRouter;
