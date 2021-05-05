const dbConnection = require("../db/dbConnection");

exports.fetchArticles = (sort_by, order, author, topic, limit) => {
  return dbConnection
    .select(
      "articles.article_id",
      "articles.title",
      "articles.created_at",
      "articles.votes",
      "articles.topic",
      "articles.author"
    )

    .count({ comment_count: "comment_id" })
    .from("articles")
    .orderBy(sort_by || "created_at", order || "desc")
    .limit(limit)
    .modify((query) => {
      if (author) query.where({ "articles.author": author });
      if (topic) query.where({ "articles.topic": topic });
    })
    .leftJoin("comments", "comments.article_id", "articles.article_id")
    .groupBy("articles.article_id");
};

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

exports.removeArticle = (article_id) => {
  return dbConnection("articles").where({ article_id }).del();
};

exports.addArticle = (addedArticle) => {
  return dbConnection("articles").insert(addedArticle, "*");
};

exports.fetchPaginatedArticles = (limit, page) => {
  return dbConnection("articles").paginate({
    perPage: limit,
    currentPage: page,
  });
};
