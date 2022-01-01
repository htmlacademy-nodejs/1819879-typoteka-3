'use strict';

module.exports.DEFAULT_COMMAND = `--help`;

module.exports.USER_ARGV_INDEX = 2;

module.exports.DEFAULT_RADIX = 10;

module.exports.ExitCode = {
  SUCCESS: 0,
  ERROR: 1,
};

module.exports.HttpCode = {
  OK: 200,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  FORBIDDEN: 403,
  UNAUTHORIZED: 401
};

module.exports.MOCK_FILE_NAME = `mock.json`;
