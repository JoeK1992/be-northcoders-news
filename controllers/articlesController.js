const {
  fetchArticleByArticleID,
  modifyArticleVotes,
  removeArticle,
  fetchArticles,
  addArticle,
  fetchPaginatedArticles,
} = require("../models/articlesModel");

exports.getArticles = (req, res, next) => {
  const { sort_by, order, author, topic, limit } = req.query;

  fetchArticles(sort_by, order, author, topic, limit)
    .then((articles) => {
      res.status(200).send({ articles });
    })
    .catch(next);
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
  modifyArticleVotes(article_id, inc_votes)
    .then((article) => {
      if (!article) {
        res.status(404).send({ msg: "Article not found" });
      } else {
        res.status(200).send({ article });
      }
    })
    .catch(next);
};

exports.deleteArticleByArticleID = (req, res, next) => {
  const { article_id } = req.params;
  removeArticle(article_id)
    .then((article) => {
      if (!article) {
        res.status(404).send({ msg: "Article not found" });
      } else {
        res.status(204).send({ article });
      }
    })
    .catch(next);
};

exports.postArticle = (req, res, next) => {
  const { title, body, topic, author } = req.body;
  addArticle({ title, body, topic, author }).then(([article]) => {
    res.status(201).send({ article });
  });
};

exports.getPaginatedArticles = (req, res, next) => {
  const { limit, page } = req.query;
  fetchPaginatedArticles(limit, page)
    .then((articles) => {
      if (articles.data.length === 0) {
        res.status(404).send({ msg: "Page not found" });
      } else {
        res.status(200).send({ articles: articles.data });
      }
    })
    .catch(next);
};
