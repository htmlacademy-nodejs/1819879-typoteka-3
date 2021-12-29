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

const TITLES = [
  `Ёлки. История деревьев`,
  `Как перестать беспокоиться и начать жить`,
  `Как достигнуть успеха не вставая с кресла`,
  `Обзор новейшего смартфона`,
  `Лучшие рок-музыканты 20-века`,
  `Как начать программировать`,
  `Учим HTML и CSS`,
  `Что такое золотое сечение`,
  `Как собрать камни бесконечности`,
  `Борьба с прокрастинацией`,
  `Рок — это протест`,
  `Самый лучший музыкальный альбом этого года`,
];

const SENTENCES = [
  `Ёлки — это не просто красивое дерево. Это прочная древесина.`,
  `Первая большая ёлка была установлена только в 1938 году.`,
  `Вы можете достичь всего. Стоит только немного постараться и запастись книгами.`,
  `Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете.`,
  `Золотое сечение — соотношение двух величин, гармоническая пропорция.`,
  `Собрать камни бесконечности легко, если вы прирожденный герой.`,
  `Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике.`,
  `Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами.`,
  `Программировать не настолько сложно, как об этом говорят.`,
  `Простые ежедневные упражнения помогут достичь успеха.`,
  `Это один из лучших рок-музыкантов.`,
  `Он написал больше 30 хитов.`,
  `Из под его пера вышло 8 платиновых альбомов.`,
  `Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем.`,
  `Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле?`,
  `Достичь успеха помогут ежедневные повторения.`,
  `Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много.`,
  `Как начать действовать? Для начала просто соберитесь.`,
  `Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры.`,
  `Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать.`,
];

const CATEGORIES = [
  `Деревья`,
  `За жизнь`,
  `Без рамки`,
  `Разное`,
  `IT`,
  `Музыка`,
  `Кино`,
  `Программирование`,
  `Железо`,
];

const getRandomTitle = () => TITLES[getRandomInt(0, TITLES.length - 1)];

const getRandomSentence = () => SENTENCES[getRandomInt(0, SENTENCES.length - 1)];
const getRandomSentences = (maxQyantity) => Array(getRandomInt(0, maxQyantity))
  .fill(null)
  .map(() => getRandomSentence())
  .join(` `);

const getRandomCategory = () => CATEGORIES[getRandomInt(0, CATEGORIES.length - 1)];
const getRandomCategories = () => {
  const categories = Array(getRandomInt(0, CATEGORIES.length - 1)).fill().map(() => getRandomCategory());
  return Array.from(new Set(categories));
};

const getRandomDate = () => {
  const subtractionDaysInt = getRandomInt(0, MAX_DAY_SUBTRACTION) * DAY_INT;
  const dateNowInt = new Date().getTime();
  return new Date(dateNowInt - subtractionDaysInt);
};

const getRandomPost = () => ({
  "title": getRandomTitle(),
  "announce": getRandomSentences(MAX_ANNOUNCES),
  "fullText": getRandomSentences(MAX_SENTENCES),
  "createdDate": getRandomDate(),
  "category": getRandomCategories()
});

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

module.exports = {
  name: `--generate`,
  run(count = DEFAULT_QYANTITY) {
    if (count > MAX_QYANTITY) {
      console.warn(chalk.red(`Не больше ${MAX_QYANTITY} публикаций`));
      process.exit(ExitCode.ERROR);
    }

    const randomCategoriesJson = JSON.stringify(new Array(count).fill(null).map(() => getRandomPost()));
    writeFile(randomCategoriesJson).then();
  }
};
