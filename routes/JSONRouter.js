const JSONRouter = require("express").Router();

const getJSON = require("../controllers/JSONController");

JSONRouter.route("").get(getJSON);
