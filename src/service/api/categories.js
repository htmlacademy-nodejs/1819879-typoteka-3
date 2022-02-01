'use strict';

const {Router} = require(`express`);
const {HttpCode} = require(`./../../../constants`);

module.exports = (routeApp, categoriesService) => {
  const routeCategories = new Router();

  routeApp.use(`/categories`, routeCategories);

  routeCategories.get(`/`, (req, res) => {
    const categories = categoriesService.getAll();
    res.status(HttpCode.OK).json(categories);
  });
};
