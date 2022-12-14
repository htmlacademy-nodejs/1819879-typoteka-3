'use strict';

const fs = require(`fs`).promises;
const chalk = require(`chalk`);
const {getRandomInt, getRandomEntity} = require(`./../../utils`);
const {ExitCode, DEFAULT_RADIX, FILL_DB_FILE_NAME} = require(`./../../../constants`);

const DEFAULT_QUANTITY = 1;
const MAX_QUANTITY = 1000;
const MAX_ANNOUNCES = 5;
const MAX_SENTENCES = 15;
const MAX_COMMENTS = 10;

const PictureRestrict = {
  MIN: 1,
  MAX: 16,
};

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
    await fs.writeFile(FILL_DB_FILE_NAME, content);
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
  const randomCategories = Array(getRandomInt(0, categories.length - 1))
    .fill({})
    .map(() => getRandomEntity(categories));
  return Array.from(new Set(randomCategories));
};

const generateComments = (comments, users, articleId) => {
  const randomComments = Array(getRandomInt(2, MAX_COMMENTS))
    .fill({})
    .map(() => getRandomEntity(comments));
  return randomComments.map((comment) => ({
    text: comment,
    userId: getRandomInt(0, users.length),
    articleId
  }));
};

const getImageFileName = (number) => `item${number.toString().padStart(2, 0)}.jpg`;

const generateArticles = (count, titlesData, sentencesData, commentsData, users) =>
  Array(count).fill({}).map((_, index) => ({
    "title": getRandomEntity(titlesData),
    "announce": getRandomSentences(sentencesData, MAX_ANNOUNCES),
    "fullText": getRandomSentences(sentencesData, MAX_SENTENCES),
    "image": getImageFileName(getRandomInt(PictureRestrict.MIN, PictureRestrict.MAX)),
    "userId": getRandomInt(1, users.length),
    "comments": generateComments(commentsData, users, index)
  }));

const generateContent = (users, countNeedArticles, titlesData, categoriesData, sentencesData, commentsData) => {
  const articles = generateArticles(countNeedArticles, titlesData, sentencesData, commentsData, users);

  const categories = getRandomCategories(categoriesData);

  const comments = articles.flatMap((article) => article.comments);

  const articleCategories = articles.map((article, index) =>
    ({articleId: index, categoryId: getRandomInt(0, categories.length)}));

  const usersValue = users.map(({email, passwordHash, firstName, lastName, avatar, isAdmin}) =>
    `('${email}', '${passwordHash}', '${firstName}', '${lastName}', '${avatar}', '${isAdmin}')`).join(`,\n`);

  const categoriesValue = categories.map((category) => (`('${category}')`)).join(`,\n`);

  const articlesValue = articles.map(({title, announce, fullText, image}) =>
    `('${title}', '${announce}', '${fullText}', '${image}', ${getRandomInt(1, users.length)})`).join(`,\n`);

  const articleCategoriesValue = articleCategories.map(({articleId, categoryId}) =>
    `(${articleId}, ${categoryId})`).join(`,\n`);

  const commentsValue = comments.map(({text, userId, articleId}) =>
    `('${text}', ${userId}, ${articleId})`).join(`,\n`);

  return `
INSERT INTO users(email, password_hash, first_name, last_name, avatar, is_admin) VALUES
${usersValue};

INSERT INTO categories(name) VALUES
${categoriesValue};

ALTER TABLE articles DISABLE TRIGGER ALL;
INSERT INTO articles(title, announce, full_text, image, user_id) VALUES
${articlesValue};
ALTER TABLE articles ENABLE TRIGGER ALL;

ALTER TABLE article_categories DISABLE TRIGGER ALL;
INSERT INTO article_categories(article_id, category_id) VALUES
${articleCategoriesValue};
ALTER TABLE article_categories ENABLE TRIGGER ALL;

ALTER TABLE comments DISABLE TRIGGER ALL;
INSERT INTO comments(text, user_id, article_id) VALUES
${commentsValue};
ALTER TABLE comments ENABLE TRIGGER ALL;`;
};


module.exports = {
  name: `--fill`,
  async run(customQuantity) {
    const countNeedArticles = Number.parseInt(customQuantity, DEFAULT_RADIX) || DEFAULT_QUANTITY;

    if (countNeedArticles > MAX_QUANTITY) {
      console.warn(chalk.red(`Не больше ${MAX_QUANTITY} публикаций`));
      process.exit(ExitCode.ERROR);
    }

    const users = [
      {
        email: `ivanov@example.com`,
        passwordHash: `5f4dcc3b5aa765d61d8327deb882cf99`,
        firstName: `Иван`,
        lastName: `Иванов`,
        avatar: `avatar1.jpg`,
        isAdmin: true
      }, {
        email: `petrov@example.com`,
        passwordHash: `5f4dcc3b5aa765d61d8327deb882cf99`,
        firstName: `Пётр`,
        lastName: `Петров`,
        avatar: `avatar2.jpg`,
        isAdmin: false
      }
    ];

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

    const contentFillDB = generateContent(users, countNeedArticles, titlesData, categoriesData, sentencesData, commentsData);
    await writeFile(contentFillDB);
  }
};
