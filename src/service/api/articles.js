'use strict';

const {Router} = require(`express`);
const articleExist = require(`./../middlewares/article-exist`);
const entityKeyValidator = require(`./../middlewares/entity-key-validator`);
const {HttpCode, EntityProps} = require(`./../../../constants`);

module.exports = (routeApp, articlesService, commentsService) => {
  const routeArticles = new Router();

  routeApp.use(`/articles`, routeArticles);

  routeArticles.get(`/`, (req, res) => {
    const articles = articlesService.findAll();
    res.status(HttpCode.OK).json(articles);
  });

  routeArticles.get(`/:articleId`, (req, res) => {
    const {articleId} = req.params;
    const article = articlesService.findOne(articleId);

    if (article) {
      res.status(HttpCode.OK).json(article);
      return;
    }

    res.status(HttpCode.NOT_FOUND).send(`Not found`);
  });

  routeArticles.post(`/`, entityKeyValidator(EntityProps.ARTICLE), (req, res) => {
    const newArticle = articlesService.create(req.body);

    res.status(HttpCode.CREATED).json(newArticle);
  });

  routeArticles.put(`/:articleId`, entityKeyValidator(EntityProps.ARTICLE), (req, res) => {
    const dataArticle = req.body;
    const {articleId} = req.params;
    const newArticle = articlesService.update(articleId, dataArticle);

    if (newArticle) {
      res.status(HttpCode.OK).json(newArticle);
      return;
    }

    res.status(HttpCode.NOT_FOUND).send(`Not found`);
  });

  routeArticles.delete(`/:articleId`, (req, res) => {
    const {articleId} = req.params;
    const oldArticle = articlesService.delete(articleId);

    if (oldArticle) {
      res.status(HttpCode.OK).json(oldArticle);
      return;
    }

    res.status(HttpCode.NOT_FOUND).send(`Not found`);
  });

  routeArticles.get(`/:articleId/comments`, articleExist(articlesService), (req, res) => {
    const {article} = res.locals;
    const comments = commentsService.findAll(article);

    res.status(HttpCode.OK).json(comments);
  });

  routeArticles.post(`/:articleId/comments`,
      [articleExist(articlesService), entityKeyValidator(EntityProps.COMMENT)],
      (req, res) => {
        const {article} = res.locals;
        const {text} = req.body;

        const newComment = commentsService.create(article, text);

        res.status(HttpCode.CREATED).json(newComment);
      });

  routeArticles.delete(`/:articleId/comments/:commentId`, articleExist(articlesService), (req, res) => {
    const {commentId} = req.params;
    const {article} = res.locals;
    const oldComment = commentsService.delete(article, commentId);

    if (oldComment) {
      res.status(HttpCode.OK).json(oldComment);
      return;
    }

    res.status(HttpCode.NOT_FOUND).send(`Not found`);
  });
};
