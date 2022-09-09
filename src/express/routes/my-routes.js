'use strict';

const {Router} = require(`express`);
const api = require(`./../api`).getAPI();

const myRouter = new Router();

myRouter.get(``, async (req, res) => {
  const articles = await api.getArticles();
  res.render(`pages/my/my`, {articles});
});

myRouter.get(`/comments`, async (req, res) => {
  const articles = await api.getArticles();

  // TODO: Need delete after migration data to db
  const comments = articles.reduce((memo, article) => {
    const commentsInThisArticle = article.comments.map((comment) => ({
      ...comment,
      articleTitle: article.title
    }));

    return memo.concat(commentsInThisArticle);
  }, []);
  res.render(`pages/my/comments`, {comments});
});

module.exports = myRouter;
