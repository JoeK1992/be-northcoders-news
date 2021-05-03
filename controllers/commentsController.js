const {
  fetchCommentsByArticleID,
  modifyCommentVotes,
  addComment,
} = require("../models/commentsModel");

exports.getCommentsByArticleID = (req, res, next) => {
  const { article_id } = req.params;
  const { order } = req.params;
  const { sort_by } = req.query;
  fetchCommentsByArticleID(article_id, sort_by, order).then((comments) => {
    res.status(200).send({ comments });
  });
};

exports.changeCommentVotes = (req, res, next) => {
  const { comment_id } = req.params;
  const { inc_votes } = req.body;
  modifyCommentVotes(comment_id, inc_votes).then((comment) => {
    console.log(comment);
    res.status(200).send({ comment });
  });
};

exports.postComment = (req, res, next) => {
  const { article_id } = req.params;
  const { author, body } = req.body;
  addComment({ article_id, author, body }).then(([comment]) => {
    res.status(201).send({ comment });
  });
};
