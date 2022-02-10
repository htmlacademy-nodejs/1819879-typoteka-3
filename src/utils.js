'use strict';

module.exports.getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

module.exports.includesQuery = (text, query) => {
  return text.trim().toLowerCase().includes(query.trim().toLowerCase());
};
