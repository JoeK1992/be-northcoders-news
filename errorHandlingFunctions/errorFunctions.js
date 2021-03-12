exports.handlePsqlErrors = (err, req, res, next) => {
  const psqlBadRequestCodes = ["22P02"];
  if (psqlBadRequestCodes.includes(err.code)) {
    res.status(400).send({ msg: "Bad request" });
  } else next(err);
};

exports.handleServerErrors = (err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: "Internal server error" });
};
