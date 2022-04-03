'use strict';

const path = require(`path`);
const pino = require(`pino`);
const {Env} = require(`./../../../constants`);

const LOG_FILE = `./logs/api.log`;

const isDevMod = process.env.NODE_ENV === Env.DEVELOPMENT;
const defaultLogLevel = isDevMod ? `debug` : `error`;

const logger = pino(
    {
      name: `base-logger`,
      level: process.env.LOG_LEVEL || defaultLogLevel,
      prettyPrint: true
    },
    isDevMod ? process.stdout : pino.destination(path.resolve(__dirname, LOG_FILE))
);

module.exports = {
  logger,
  getLogger(options = {}) {
    return logger.child(options);
  }
};
