const dbConnection = require("../db/dbConnection");
const getArticleByArticleID = require("../controllers/articlesController");

exports.fetchCommentsByArticleID = (article_id, sort_by, order) => {
  return dbConnection("comments")
    .select("*")
    .from("comments")
    .where({ article_id })
    .orderBy(sort_by || "created_at", order || "desc");
};

exports.modifyCommentVotes = (comment_id, votes) => {
  return dbConnection
    .from("comments")
    .where({ comment_id })
    .increment("votes", votes)
    .returning("*")
    .then(([comment]) => {
      return comment;
    });
};

exports.addComment = (addedComment) => {
  return dbConnection("comments").insert(addedComment, "*");
};

exports.removeComment = (comment_id) => {
  return dbConnection("comments").where({ comment_id }).del();
};
