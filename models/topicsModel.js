const dbConnection = require("../db/dbConnection");

exports.fetchTopics = () => {
  return dbConnection.select("description", "slug").from("topics");
};

exports.addTopic = (addedTopic) => {
  return dbConnection("topics").insert(addedTopic, "*");
};
