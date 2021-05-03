const { query } = require("express");
const {
  fetchArticleByArticleID,
  modifyArticleVotes,
  removeArticle,
  fetchArticles,
} = require("../models/articlesModel");

exports.getArticles = (req, res, next) => {
  const { sort_by } = req.query;
  const { order } = req.query;
  const { author } = req.query;
  const { topic } = req.query;
  fetchArticles(sort_by, order, author, topic).then((articles) => {
    res.status(200).send({ articles });
  });
};

exports.getArticleByArticleID = (req, res, next) => {
  const { article_id } = req.params;
  fetchArticleByArticleID(article_id)
    .then((article) => {
      if (!article) {
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

exports.deleteArticleByArticleID = (req, res, next) => {
  const { article_id } = req.params;
  removeArticle(article_id).then((article) => {
    res.status(204).send({ article });
  });
};
