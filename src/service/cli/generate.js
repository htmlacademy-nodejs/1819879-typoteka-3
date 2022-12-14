'use strict';

const fs = require(`fs`).promises;
const chalk = require(`chalk`);
const {getRandomInt, getRandomEntity} = require(`./../../utils`);
const {randomUUID} = require(`crypto`);
const {ExitCode, DEFAULT_RADIX, MOCK_FILE_NAME} = require(`./../../../constants`);

const DEFAULT_QUANTITY = 1;
const MAX_QUANTITY = 1000;
const MAX_ANNOUNCES = 5;
const MAX_SENTENCES = 15;
const DAY_INT = 24 * 3600 * 1000;
const MAX_DAY_SUBTRACTION = 90;

const DATA_PATH = `./data/`;
const TITLES_FILE_NAME = `titles.txt`;
const CATEGORIES_FILE_NAME = `categories.txt`;
const SENTENCES_FILE_NAME = `sentences.txt`;
const COMMENTS_FILE_NAME = `comments.txt`;

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
    await fs.writeFile(MOCK_FILE_NAME, content);
    console.info(chalk.green(`Write file success`));
    process.exit(ExitCode.SUCCESS);
  } catch (error) {
    console.error(chalk.red(`Write file failed... - ${error}`));
    process.exit(ExitCode.ERROR);
  }
};

const getRandomSentences = (sentences, maxQuantity) => Array(getRandomInt(0, maxQuantity))
  .fill(null)
  .map(() => getRandomEntity(sentences))
  .join(` `);

const getRandomCategories = (categories) => {
  const randomCategories = Array(getRandomInt(0, categories.length - 1)).fill().map(() => getRandomEntity(categories));
  return Array.from(new Set(randomCategories));
};

const getRandomDate = () => {
  const subtractionDaysInt = getRandomInt(0, MAX_DAY_SUBTRACTION) * DAY_INT;
  const dateNowInt = new Date().getTime();
  return new Date(dateNowInt - subtractionDaysInt);
};

const getRandomComments = (comments) => {
  const randomComments = Array(getRandomInt(0, comments.length - 1)).fill().map(() => getRandomEntity(comments));
  return Array.from(new Set(randomComments)).map((comment) => ({
    id: randomUUID(),
    text: comment
  }));
};

const getRandomPost = (titles, categories, sentences, comments) => ({
  "id": randomUUID(),
  "title": getRandomEntity(titles),
  "announce": getRandomSentences(sentences, MAX_ANNOUNCES),
  "fullText": getRandomSentences(sentences, MAX_SENTENCES),
  "createdDate": getRandomDate(),
  "category": getRandomCategories(categories),
  "comments": getRandomComments(comments)
});

const getRandomPosts = async (count) => {
  const [
    titlesData,
    categoriesData,
    sentencesData,
    commentsData
  ] = await Promise.all([
    readFile(TITLES_FILE_NAME),
    readFile(CATEGORIES_FILE_NAME),
    readFile(SENTENCES_FILE_NAME),
    readFile(COMMENTS_FILE_NAME)
  ]);
  return new Array(count)
    .fill(null)
    .map(() => getRandomPost(titlesData, categoriesData, sentencesData, commentsData));
};

module.exports = {
  name: `--generate`,
  async run(customQuantity) {
    const quantity = Number.parseInt(customQuantity, DEFAULT_RADIX) || DEFAULT_QUANTITY;

    if (quantity > MAX_QUANTITY) {
      console.warn(chalk.red(`Не больше ${MAX_QUANTITY} публикаций`));
      process.exit(ExitCode.ERROR);
    }

    const randomPostsJson = JSON.stringify(await getRandomPosts(quantity));
    await writeFile(randomPostsJson);
  }
};
