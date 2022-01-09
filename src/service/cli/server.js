'use strict';

const chalk = require(`chalk`);
const express = require(`express`);
const fs = require(`fs`).promises;
const {DEFAULT_RADIX, HttpCode, MOCK_FILE_NAME} = require(`../../../constants`);

const DEFAULT_PORT = 3000;
const TEXT_NOT_FOUND = `Not found`;

const server = express();
server.use(express.json());
server.get(`/posts`, async (req, res) => {
  try {
    const fileContent = await fs.readFile(MOCK_FILE_NAME, `utf8`);
    const mocks = JSON.parse(fileContent);
    res.json(mocks);
  } catch (error) {
    console.error(chalk.red(`Error response mock data - ${error.message}`));
    res.send([]);
  }
});

server.use(`/`, (req, res) => res.status(HttpCode.NOT_FOUND).send(TEXT_NOT_FOUND));

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
