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

      // {
      //   body: 'Corporis magnam placeat quia nulla illum nisi. Provident magni aut et earum illo labore aperiam. Dolorem ipsum dignissimos est ex. Minima voluptatibus nihil commodi veritatis. Magnam aut suscipit dignissimos nostrum ea.',
      //   belongs_to: 'A BRIEF HISTORY OF FOOD—NO BIG DEAL',
      //   created_by: 'weegembump',
      //   votes: 3,
      //   created_at: 1504946266488
      // },

      // NEED TO ADD AUTHOR
      // NEED TO ADD ARTICLE ID
    });
};
