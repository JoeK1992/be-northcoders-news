const commentsRouter = require("express").Router();

const { changeCommentVotes } = require("../controllers/commentsController");

commentsRouter.route("/:comment_id").patch(changeCommentVotes);

module.exports = commentsRouter;
