'use strict';

const {Router} = require(`express`);

const mainRouter = new Router();
mainRouter.get(`/`, (req, res) => res.render(`pages/main`));
mainRouter.get(`/register`, (req, res) => res.render(`pages/sign-up`));
mainRouter.get(`/login`, (req, res) => res.render(`pages/login`));
mainRouter.get(`/search`, (req, res) => res.render(`pages/search`));
mainRouter.get(`/categories`, (req, res) => res.render(`pages/all-categories`));

module.exports = mainRouter;
