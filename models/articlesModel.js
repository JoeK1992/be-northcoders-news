const dbConnection = require("../dbConnection");

exports.fetchArticleByArticleID = (article_id) => {
  return dbConnection
    .select("*")
    .from("articles")
    .where({ article_id })
    .then(([article]) => {
      if (article.length === 0) res.status(404).send({ msg: "Not found" });
      else {
        return article;
      }
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
