const articlesRouter = require("express").Router();

console.log("in articles router");

const {
  getArticles,
  getArticleByArticleID,
  changeArticleVotesByArticleID,
  deleteArticleByArticleID,
  postArticle,
  getPaginatedArticles,
} = require("../controllers/articlesController");

const {
  getCommentsByArticleID,
  postComment,
} = require("../controllers/commentsController");

const { handle405Errors } = require("../errorHandlingFunctions/errorFunctions");

articlesRouter
  .route("/paginate")
  .get(getPaginatedArticles)
  .all(handle405Errors);

articlesRouter
  .route("/:article_id")
  .get(getArticleByArticleID)
  .patch(changeArticleVotesByArticleID)
  .delete(deleteArticleByArticleID)
  .all(handle405Errors);

articlesRouter
  .route("")
  .get(getArticles)
  .post(postArticle)
  .all(handle405Errors);

articlesRouter
  .route("/:article_id/comments")
  .get(getCommentsByArticleID)
  .post(postComment)
  .all(handle405Errors);

module.exports = articlesRouter;
