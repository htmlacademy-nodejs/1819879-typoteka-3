'use strict';

const {Router} = require(`express`);
const api = require(`../api`).getAPI();

const articlesRouter = new Router();
articlesRouter.get(`/add`, (req, res) => res.render(`pages/articles/post`));
articlesRouter.get(`/:id`, (req, res) => res.render(`pages/articles/post-detail`));
articlesRouter.get(`/edit/:id`, async (req, res) => {
  const articleId = req.params.id;
  const [article, categories] = await Promise.all([
    api.getArticle(articleId),
    api.getCategories()
  ]);

  res.render(`pages/articles/post`, {article, categories});
});
articlesRouter.get(`/category/:id`, (req, res) => res.render(`pages/articles/articles-by-category`));

module.exports = articlesRouter;
