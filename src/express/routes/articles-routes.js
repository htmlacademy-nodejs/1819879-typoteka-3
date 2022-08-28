'use strict';

const {Router} = require(`express`);
const api = require(`../api`).getAPI();

const articlesRouter = new Router();
articlesRouter.get(`/add`, async (req, res) => {
  const categories = await api.getCategories();

  return res.render(`pages/articles/post-new`, {categories});
});

articlesRouter.get(`/:id`, (req, res) => {
  return res.render(`pages/articles/post-detail`);
});

articlesRouter.get(`/edit/:id`, async (req, res) => {
  const articleId = req.params.id;
  const [article, categories] = await Promise.all([
    api.getArticle(articleId),
    api.getCategories()
  ]);

  res.render(`pages/articles/post-edit`, {article, categories});
});

articlesRouter.get(`/category/:id`, (req, res) => res.render(`pages/articles/articles-by-category`));

module.exports = articlesRouter;
