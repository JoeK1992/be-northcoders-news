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
      return knex("topics").insert(topicData).returning("*");
    })
    .then(() => {
      return knex("users").insert(userData).returning("*");
    })
    .then(() => {
      const articles = formatArticles(articleData);

      return knex("articles").insert(articles).returning("*");
    })
    .then(() => {
      const referenceObj = createReferenceObj(
        commentData,
        articleData,
        "belongs_to",
        "article_id"
      );

      const comments = formatComments(commentData, referenceObj);
      return knex("comments").insert(comments);
    });
};
