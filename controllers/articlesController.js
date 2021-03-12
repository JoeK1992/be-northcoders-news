const { fetchArticleByArticleID } = require("../models/articlesModel");

exports.getArticleByArticleID = (req, res, next) => {
  const { article_id } = req.params;
  fetchArticleByArticleID(article_id).then((article) => {
    res.status(200).send({ article }).catch(next);
  });
};
