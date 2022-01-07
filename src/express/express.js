'use strict';

const chalk = require(`chalk`);
const path = require(`path`);
const express = require(`express`);

const mainRouter = require(`./routes/main-routes`);
const myRouter = require(`./routes/my-routes`);
const articlesRouter = require(`./routes/articles-routes`);
const {USER_ARGV_INDEX, DEFAULT_RADIX} = require(`../../constants`);

const DEFAULT_PORT = 8080;
const PUBLIC_DIR = `public`;
const TEMPLATES_DIR = `templates`;

const customPort = process.argv[USER_ARGV_INDEX];
const port = Number.parseInt(customPort, DEFAULT_RADIX) || DEFAULT_PORT;

const onListenServer = (error) => {
  if (error) {
    console.error(chalk.red(`Error started server ${error.message}`));
    return;
  }
  console.log(chalk.green(`Server started in ${port} port`));
};

const app = express();
app.set(`views`, path.resolve(__dirname, TEMPLATES_DIR));
app.set(`view engine`, `pug`);
app.use(express.static(path.resolve(__dirname, PUBLIC_DIR)));

app.use(`/`, mainRouter);
app.use(`/my`, myRouter);
app.use(`/articles`, articlesRouter);

app.listen(port, onListenServer);
