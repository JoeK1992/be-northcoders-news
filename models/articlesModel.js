const dbConnection = require("../dbConnection");

exports.fetchArticleByArticleID = (article_id) => {
  return dbConnection.select("*").from("articles").where({ article_id });
  console.log(article);
  if (article.length === 0) res.status(404).send({ msg: "Not found" });
  else {
    return article;
  }
};
