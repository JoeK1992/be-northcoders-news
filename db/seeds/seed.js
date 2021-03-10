const {
  formatArticles,
  formatComments,
  createReferenceObj,
} = require("../utils/data-manipulation");

const {
  topicData,
  articleData,
  commentData,
  userData,
} = require("../data/index.js");

exports.seed = function (knex) {
  return knex.migrate
    .rollback()
    .then(() => knex.migrate.latest())
    .then(() => {
      return knex("topics").insert(topicData);
    })
    .then(() => {
      return knex("users").insert(userData);
    })
    .then(() => {
      const articles = formatArticles(articleData);

      return knex("articles").insert(articles).returning("*");
    })
    .then((articleRows) => {
      const referenceObj = createReferenceObj(
        articleRows,
        "title",
        "article_id"
      );
      const comments = formatComments(commentData, referenceObj);
      return knex("comments").insert(comments);
    });
};
