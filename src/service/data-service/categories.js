'use strict';

class CategoriesService {
  constructor(articles) {
    this._articles = articles;
  }

  getAll() {
    const categories = this._articles.reduce((memo, article) => {
      article.category.forEach((category) => memo.add(category));
      return memo;
    }, new Set());

    return Array.from(categories);
  }
}

module.exports = CategoriesService;
