'use strict';

const {includesQuery} = require(`./../../utils`);

class SearchService {
  constructor(articles) {
    this._articles = articles;
  }

  search(query) {
    return this._articles.filter((article) => includesQuery(article.title, query));
  }
}

module.exports = SearchService;
