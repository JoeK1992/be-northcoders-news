const (formatArticles) = require("../utils/data-manipulation")

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
    .then((insertedTopics) => {
      // console.log(insertedTopics);
      // console.log(articleData, "***********88");

      // invoke function that returns everything
      // but converts inputted time into right format

      const articles = formatArticles(articleRawData);

      return knex("articles").insert(articles).returning("*");

      // function that takes insertedTopics
      // take article data
      // return the correctly formatted array
      // insert array into articles table

      // topic field, topicData,

      // article_id which is the primary key - DONE
      // title - DONE
      // body - DONE
      // votes defaults to 0 - DONE
      // topic field which references the slug in the topics table
      // author field that references a user's primary key (username) - DONE
      // created_at defaults to the current timestamp - DONE
    })
    .then((insertedTopics) => {
      return knex("users").insert(userData).returning("*");
    });
};
