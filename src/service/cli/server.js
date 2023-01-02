'use strict';

const express = require(`express`);
const {DEFAULT_RADIX, HttpCode, MAX_REQUEST_SIZE} = require(`./../../../constants`);
const sequelize = require(`./../lib/sequelize`);
const routeApp = require(`./../api`);
const {getLogger} = require(`./../lib/logger`);

const DEFAULT_PORT = 3000;
const TEXT_NOT_FOUND = `Not found`;

const logger = getLogger({name: `api`});
const server = express();
server.use(express.json({limit: MAX_REQUEST_SIZE}));

server.use((req, res, next) => {
  logger.debug(`Requested route api - ${req.url}`);
  res.on(`finish`, () => {
    logger.info(`Response status code - ${res.statusCode}`);
  });
  next();
});

server.use(`/api`, routeApp);

server.use(`/`, (req, res) => {
  res.status(HttpCode.NOT_FOUND).send(TEXT_NOT_FOUND);
  logger.error(`Route not found - ${req.url}`);
});

server.use((err, _req, res, _next) => {
  logger.error(`An error occured on processing request: ${err.stack}`);
  res.status(HttpCode.INTERNAL_SERVER_ERROR).send(`Internal error`);
});

module.exports = {
  name: `--server`,
  async run(customPort) {
    try {
      logger.info(`Trying to connect to database...`);
      await sequelize.authenticate();
    } catch (err) {
      logger.error(`An error occured: ${err.message}`);
      process.exit(1);
    }
    logger.info(`Connection to database established`);

    const port = Number.parseInt(customPort, DEFAULT_RADIX) || DEFAULT_PORT;

    server.listen(port, (error) => {
      if (error) {
        logger.error(`Error started server ${error.message}`);
        return;
      }
      logger.info(`Server started in ${port} port`);
    });
  }
};
