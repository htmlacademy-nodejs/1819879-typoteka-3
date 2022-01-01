'use strict';

const chalk = require(`chalk`);
const http = require(`http`);
const fs = require(`fs`).promises;
const {DEFAULT_RADIX, HttpCode, MOCK_FILE_NAME} = require(`../../../constants`);

const DEFAULT_PORT = 3000;

const sendResponse = (res, statusCode, message) => {
  const template = `
    <!Doctype html>
      <html lang="ru">
      <head>
        <title>With love from Node</title>
      </head>
      <body>${message}</body>
    </html>`.trim();

  res.writeHead(statusCode, {
    'Content-Type': `text/html; charset=UTF-8`
  });
  res.end(template);
};

const onClientConnect = async (req, res) => {
  const textNotFound = `Not found`;

  if (req.url === `/`) {
    try {
      const fileContent = await fs.readFile(MOCK_FILE_NAME, `utf8`);
      const mockTitles = JSON.parse(fileContent).map((post) => `<li>${post.title}</li>`).join(``);
      const message = `<ul>${mockTitles}</ul>`;
      sendResponse(res, HttpCode.OK, message);
    } catch (error) {
      console.error(chalk.red(`Error response mock data - ${error.message}`));
      sendResponse(res, HttpCode.NOT_FOUND, textNotFound);
    }
    return;
  }

  sendResponse(res, HttpCode.NOT_FOUND, textNotFound);
};

module.exports = {
  name: `--server`,
  run(customPort) {
    const port = Number.parseInt(customPort, DEFAULT_RADIX) || DEFAULT_PORT;

    const server = http.createServer({port}, onClientConnect);
    server.listen(port);

    server.on(`listening`, (error) => {
      if (error) {
        console.error(chalk.red(`Error started server ${error.message}`));
        return;
      }
      console.log(chalk.green(`Server started in ${port} port`));
    });
  }
};
