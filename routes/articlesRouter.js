const articlesRouter = require("express").Router();

const { getArticleByArticleID } = require("../controllers/articlesController");

articlesRouter.route("/:article_id").get(getArticleByArticleID);

module.exports = articlesRouter;
