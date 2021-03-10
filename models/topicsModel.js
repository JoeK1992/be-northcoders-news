const dbConnection = require("../dbConnection");

exports.fetchTopics = () => {
  return dbConnection.select("description", "slug").from("topics");
};
