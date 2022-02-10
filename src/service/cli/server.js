'use strict';

const chalk = require(`chalk`);
const express = require(`express`);
const {DEFAULT_RADIX, HttpCode, MAX_REQUEST_SIZE} = require(`./../../../constants`);
const routeApp = require(`./../api`);

const DEFAULT_PORT = 3000;
const TEXT_NOT_FOUND = `Not found`;

const server = express();
server.use(express.json({limit: MAX_REQUEST_SIZE}));

server.use(`/api`, routeApp);

server.use(`/`, (req, res) => res.status(HttpCode.NOT_FOUND).send(TEXT_NOT_FOUND));

server.use((err, _req, res, _next) => {
  console.error(chalk.red(`An error occured on processing request: ${err.stack}`));
  res.status(HttpCode.INTERNAL_SERVER_ERROR).send(`Internal error`);
});

module.exports = {
  name: `--server`,
  run(customPort) {
    const port = Number.parseInt(customPort, DEFAULT_RADIX) || DEFAULT_PORT;

    server.listen(port, (error) => {
      if (error) {
        console.error(chalk.red(`Error started server ${error.message}`));
        return;
      }
      console.log(chalk.green(`Server started in ${port} port`));
    });
  }
};
