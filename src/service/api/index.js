'use strict';

const {Router} = require(`express`);
const getMockData = require(`./../lib/get-mock-data`);
const categories = require(`./categories`);
const search = require(`./search`);
const articles = require(`./articles`);
const CategoriesService = require(`./../data-service/categories`);
const SearchService = require(`./../data-service/search`);
const ArticlesService = require(`./../data-service/articles`);
const CommentsService = require(`./../data-service/comments`);

const routeApp = new Router();

(async () => {
  const mockData = await getMockData();

  categories(routeApp, new CategoriesService(mockData));
  search(routeApp, new SearchService(mockData));
  articles(routeApp, new ArticlesService(mockData), new CommentsService());
})();

module.exports = routeApp;
