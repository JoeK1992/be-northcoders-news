const articlesRouter = require("express").Router();

const {
  getArticleByArticleID,
  changeArticleVotesByArticleID,
} = require("../controllers/articlesController");

articlesRouter
  .route("/:article_id")
  .get(getArticleByArticleID)
  .patch(changeArticleVotesByArticleID);

module.exports = articlesRouter;
