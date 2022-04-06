'use strict';

module.exports.Env = {
  DEVELOPMENT: `development`,
  PRODUCTION: `production`,
};

module.exports.DEFAULT_COMMAND = `--help`;

module.exports.USER_ARGV_INDEX = 2;

module.exports.DEFAULT_RADIX = 10;

module.exports.MAX_REQUEST_SIZE = `10kb`;

module.exports.ExitCode = {
  SUCCESS: 0,
  ERROR: 1,
};

module.exports.HttpCode = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

module.exports.MOCK_FILE_NAME = `mock.json`;

module.exports.EntityProps = {
  ARTICLE: [`title`, `announce`, `fullText`, `category`],
  COMMENT: [`text`]
};
