const ENV = process.env.NODE_ENV || "development";

const test = require("./test-data/index");

const development = require("./development-data/index");

const data = { test, development, production: development };

module.exports = data[ENV];
