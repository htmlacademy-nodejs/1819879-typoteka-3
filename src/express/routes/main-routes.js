'use strict';

const {Router} = require(`express`);
const api = require(`./../api`).getAPI();

const mainRouter = new Router();

mainRouter.get(`/`, async (req, res) => {
  const articles = await api.getArticles();
  res.render(`pages/main`, {articles});
});

mainRouter.get(`/register`, (req, res) => res.render(`pages/sign-up`));

mainRouter.get(`/login`, (req, res) => res.render(`pages/login`));

mainRouter.get(`/search`, (req, res) => res.render(`pages/search`));

mainRouter.get(`/categories`, (req, res) => res.render(`pages/all-categories`));

module.exports = mainRouter;
