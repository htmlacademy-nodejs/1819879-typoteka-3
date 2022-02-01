'use strict';

const chalk = require(`chalk`);
const express = require(`express`);
const {DEFAULT_RADIX, HttpCode} = require(`./../../../constants`);
const routeApp = require(`./../api`);

const DEFAULT_PORT = 3000;
const TEXT_NOT_FOUND = `Not found`;

const server = express();
server.use(express.json());

server.use(`/api`, routeApp);

server.use(`/`, (req, res) => res.status(HttpCode.NOT_FOUND).send(TEXT_NOT_FOUND));

server.use((err, _req, _res, _next) => {
  console.error(`An error occured on processing request: ${err.message}`);
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
