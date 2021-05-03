const dbConnection = require("../db/dbConnection");

exports.fetchUsers = () => {
  return dbConnection.select("*").from("users");
};

exports.fetchUserByUsername = (username) => {
  return dbConnection
    .select("*")
    .from("users")
    .where({ username })
    .then(([user]) => {
      return user;
    });
};
