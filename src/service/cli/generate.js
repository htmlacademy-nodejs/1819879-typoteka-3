'use strict';

const fs = require(`fs`).promises;
const {getRandomInt} = require(`../../utils`);
const chalk = require(`chalk`);
const {ExitCode, DEFAULT_QYANTITY, MAX_QYANTITY} = require(`../../../constants`);

const MAX_ANNOUNCES = 5;
const MAX_SENTENCES = 15;
const DAY_INT = 24 * 3600 * 1000;
const MAX_DAY_SUBTRACTION = 90;
const FILE_NAME = `mock.json`;

const DATA_PATH = `./data/`;
const TITLES_FILE_NAME = `titles.txt`;
const CATEGORIES_FILE_NAME = `categories.txt`;
const SENTENCES_FILE_NAME = `sentences.txt`;

const readFile = async (fileName) => {
  try {
    const content = await fs.readFile(`${DATA_PATH}${fileName}`, `utf8`);
    return content.split(`\n`)
      .map((text) => text.trim())
      .filter((text) => Boolean(text));
  } catch (error) {
    console.error(chalk.red(`Write file failed... - ${error}`));
    return ``;
  }
};

const writeFile = async (content) => {
  try {
    await fs.writeFile(FILE_NAME, content);
    console.info(chalk.green(`Write file success`));
    process.exit(ExitCode.SUCCESS);
  } catch (error) {
    console.error(chalk.red(`Write file failed... - ${error}`));
    process.exit(ExitCode.ERROR);
  }
};

const getRandomTitle = (titles) => titles[getRandomInt(0, titles.length - 1)];

const getRandomSentence = (sentences) => sentences[getRandomInt(0, sentences.length - 1)];
const getRandomSentences = (sentences, maxQyantity) => Array(getRandomInt(0, maxQyantity))
  .fill(null)
  .map(() => getRandomSentence(sentences))
  .join(` `);

const getRandomCategory = (categories) => categories[getRandomInt(0, categories.length - 1)];
const getRandomCategories = (categories) => {
  const randomCategories = Array(getRandomInt(0, categories.length - 1)).fill().map(() => getRandomCategory(categories));
  return Array.from(new Set(randomCategories));
};

const getRandomDate = () => {
  const subtractionDaysInt = getRandomInt(0, MAX_DAY_SUBTRACTION) * DAY_INT;
  const dateNowInt = new Date().getTime();
  return new Date(dateNowInt - subtractionDaysInt);
};

const getRandomPost = (titles, categories, sentences) => ({
  "title": getRandomTitle(titles),
  "announce": getRandomSentences(sentences, MAX_ANNOUNCES),
  "fullText": getRandomSentences(sentences, MAX_SENTENCES),
  "createdDate": getRandomDate(),
  "category": getRandomCategories(categories)
});

const getRandomPosts = async (count) => {
  const [titlesData, categoriesData, sentencesData] = await Promise.all([
    readFile(TITLES_FILE_NAME),
    readFile(CATEGORIES_FILE_NAME),
    readFile(SENTENCES_FILE_NAME)
  ]);
  return new Array(count).fill(null).map(() => getRandomPost(titlesData, categoriesData, sentencesData));
};

module.exports = {
  name: `--generate`,
  async run(count = DEFAULT_QYANTITY) {
    if (count > MAX_QYANTITY) {
      console.warn(chalk.red(`Не больше ${MAX_QYANTITY} публикаций`));
      process.exit(ExitCode.ERROR);
    }

    const randomCategoriesJson = JSON.stringify(await getRandomPosts(count));
    await writeFile(randomCategoriesJson);
  }
};
