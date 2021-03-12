const {
  fetchArticleByArticleID,
  modifyArticleVotes,
} = require("../models/articlesModel");

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

exports.changeArticleVotesByArticleID = (req, res, next) => {
  const { article_id } = req.params;
  const { inc_votes } = req.body;
  modifyArticleVotes(article_id, inc_votes).then((article) => {
    res.status(200).send({ article });
  });
};
