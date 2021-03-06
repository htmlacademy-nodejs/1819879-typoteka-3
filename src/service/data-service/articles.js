'use strict';

const {randomUUID} = require(`crypto`);

class ArticlesService {
  constructor(articles) {
    this._articles = articles;
  }

  findAll() {
    return this._articles;
  }

  findOne(id) {
    return this._articles.find((article) => article.id === id);
  }

  create(article) {
    const newArticle = {
      id: randomUUID(),
      ...article
    };
    this._articles.push(newArticle);

    return newArticle;
  }

  update(id, newArticle) {
    const oldArticle = this.findOne(id);

    if (oldArticle) {
      return Object.assign(oldArticle, newArticle);
    }

    return null;
  }

  delete(id) {
    const oldArticle = this.findOne(id);

    if (!oldArticle) {
      return null;
    }

    this._articles = this._articles.filter((article) => article.id !== id);
    return oldArticle;
  }
}

module.exports = ArticlesService;
