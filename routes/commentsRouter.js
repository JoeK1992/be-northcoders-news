const commentsRouter = require("express").Router();

const {
  changeCommentVotes,
  deleteComment,
} = require("../controllers/commentsController");
const { handle405Errors } = require("../errorHandlingFunctions/errorFunctions");

commentsRouter
  .route("/:comment_id")
  .patch(changeCommentVotes)
  .delete(deleteComment)
  .all(handle405Errors);

module.exports = commentsRouter;
