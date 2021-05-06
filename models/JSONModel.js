const fs = require("fs").promises;

exports.fetchAllEndpoints = () =>
  new Promise((res, rej) => {
    fs.readFile("./endpoints.json", "utf8", (err, data) => {
      if (err) rej(err);
      else res(data);
    });
  });
