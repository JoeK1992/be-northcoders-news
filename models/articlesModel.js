const dbConnection = require("../dbConnection");

exports.fetchArticleByArticleID = (article_id) => {
  return dbConnection.select("*").from("articles").where({ article_id });
};
