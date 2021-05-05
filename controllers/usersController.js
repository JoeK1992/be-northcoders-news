const {
  fetchUsers,
  fetchUserByUsername,
  addUser,
} = require("../models/usersModel");

exports.getUsers = (req, res, next) => {
  fetchUsers()
    .then((users) => {
      res.status(200).send({ users });
    })
    .catch(next);
};

exports.getUserByUsername = (req, res, next) => {
  const { username } = req.params;
  fetchUserByUsername(username)
    .then((user) => {
      if (!user) {
        res.status(404).send({ msg: "User not found" });
      } else {
        res.status(200).send({ user });
      }
    })
    .catch(next);
};

exports.postUser = (req, res, next) => {
  const { username, avatar_url, name } = req.body;
  addUser({ username, avatar_url, name })
    .then(([user]) => {
      res.status(201).send({ user });
    })
    .catch(next);
};
