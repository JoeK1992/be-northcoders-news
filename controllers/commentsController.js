const {
  fetchCommentsByArticleID,
  modifyCommentVotes,
  addComment,
  removeComment,
} = require("../models/commentsModel");

exports.getCommentsByArticleID = (req, res, next) => {
  const { article_id } = req.params;
  const { sort_by, order } = req.query;
  fetchCommentsByArticleID(article_id, sort_by, order)
    .then((comments) => {
      res.status(200).send({ comments });
    })
    .catch(next);
};

exports.changeCommentVotes = (req, res, next) => {
  const { comment_id } = req.params;
  const { inc_votes } = req.body;
  modifyCommentVotes(comment_id, inc_votes)
    .then((comment) => {
      if (!comment) {
        res.status(404).send({ msg: "Comment does not exist" });
      }
      res.status(200).send({ comment });
    })
    .catch(next);
};

exports.postComment = (req, res, next) => {
  const { article_id } = req.params;
  const { author, body } = req.body;
  addComment({ article_id, author, body })
    .then(([comment]) => {
      res.status(201).send({ comment });
    })
    .catch(next);
};

exports.deleteComment = (req, res, next) => {
  const { comment_id } = req.params;
  removeComment(comment_id)
    .then((comment) => {
      if (!comment) {
        res.status(404).send({ msg: "Comment does not exist" });
      } else {
        res.status(204).send({ comment });
      }
    })
    .catch(next);
};
