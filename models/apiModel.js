const fs = require("fs").promises;

exports.fetchApiJSON = () => {
  return fs.readFile("endpoints.json", "utf8").then((apiJSON) => {
    return JSON.stringify(obj, null, 2)(apiJSON);
  });
};
