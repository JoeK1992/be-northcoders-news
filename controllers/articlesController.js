const { fetchArticleByArticleID } = require("../models/articlesModel");

exports.getArticleByArticleID = (req, res, next) => {
  const { article_id } = req.params;
  fetchArticleByArticleID(article_id)
    .then((article) => {
      if (article.length === 0) {
        res.status(404).send({ msg: "Article not found" });
      } else {
        res.status(200).send({ article });
      }
    })
    .catch(next);
};
