const dbConnection = require("../dbConnection");

exports.fetchArticleByArticleID = (article_id) => {
  return dbConnection
    .select("*")
    .from("articles")
    .where({ article_id })
    .then(([article]) => {
      return article;
    });
};

exports.modifyArticleVotes = (article_id, votes) => {
  return dbConnection
    .from("articles")
    .where({ article_id })
    .increment("votes", votes)
    .returning("*")
    .then(([article]) => {
      return article;
    });
};
