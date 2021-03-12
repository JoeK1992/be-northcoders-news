exports.handleCustomErrors = (err, res, req, next) => {
  if (err.status) res.status(err.status).send({ msg: err.msg });
  else next(err);
};

exports.handlePsqlErrors = (err, res, req, next) => {
  const psqlBadRequestCodes = ["22P02"];
  if (psqlBadRequestCodes.includes(err.code))
    res.status(400).send({ msg: "Bad request" });
  else next(err);
};

exports.handleServerErrors = (err, req, res, next) => {
  res.status(500).send({ msg: "Internal server error" });
};
