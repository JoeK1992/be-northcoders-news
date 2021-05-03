const articlesRouter = require("express").Router();

const {
  getArticles,
  getArticleByArticleID,
  changeArticleVotesByArticleID,
  deleteArticleByArticleID,
} = require("../controllers/articlesController");

const {
  getCommentsByArticleID,
  postComment,
} = require("../controllers/commentsController");

const { handle405Errors } = require("../errorHandlingFunctions/errorFunctions");

articlesRouter
  .route("/:article_id")
  .get(getArticleByArticleID)
  .patch(changeArticleVotesByArticleID)
  .delete(deleteArticleByArticleID)
  .all(handle405Errors);

articlesRouter.route("").get(getArticles);

articlesRouter
  .route("/:article_id/comments")
  .get(getCommentsByArticleID)
  .post(postComment);

module.exports = articlesRouter;
