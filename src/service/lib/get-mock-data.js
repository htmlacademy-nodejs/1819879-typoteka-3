'use strict';

const fs = require(`fs`).promises;
const chalk = require(`chalk`);
const {MOCK_FILE_NAME} = require(`./../../../constants`);

module.exports = async () => {
  let data = [];

  if (data.length > 0) {
    return data;
  }

  try {
    const fileContent = await fs.readFile(MOCK_FILE_NAME, `utf8`);
    data = JSON.stringify(fileContent);
  } catch (error) {
    console.error(chalk.red(`Error response mock data - ${error.message}`));
  }

  return data;
};
