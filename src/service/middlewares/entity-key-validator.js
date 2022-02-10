'use strict';

const {HttpCode} = require(`./../../../constants`);

module.exports = (articleKeys) => (req, res, next) => {
  const dataKeys = Object.keys(req.body);
  const isValid = articleKeys.every((articleKey) => dataKeys.includes(articleKey));

  if (!isValid) {
    res.status(HttpCode.BAD_REQUEST).send(`Bad request`);
    return;
  }

  next();
};
