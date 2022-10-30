'use strict';

const path = require(`path`);
const {randomUUID} = require(`crypto`);
const {Router} = require(`express`);
const multer = require(`multer`);
const {ensureArray} = require(`../../utils`);
const api = require(`../api`).getAPI();

const UPLOAD_IMG_DIR = `upload/img`;
const uploadDirImgAbsolute = path.resolve(__dirname, UPLOAD_IMG_DIR);

const storage = multer.diskStorage({
  destination: uploadDirImgAbsolute,
  filename: (req, file, cb) => {
    const uniqueName = randomUUID();
    const extension = file.originalname.split(`.`).pop();
    cb(null, `${uniqueName}.${extension}`);
  },
});

const upload = multer({storage});

const articlesRouter = new Router();

articlesRouter.get(`/add`, async (req, res) => {
  const categories = await api.getCategories();
  return res.render(`pages/articles/post-new`, {categories});
});


// TODO обработка формы добавления публикации
articlesRouter.post(`/add`, upload.single(`upload`), async (req, res) => {
  const {body, file} = req;

  const articleData = {
    title: body.title,
    category: ensureArray(body.category),
    announce: body.announcement,
    fullText: body[`full-text`],
    photo: file ? file.filename : ``
  };

  try {
    await api.createArticle(articleData);
    res.redirect(`/my`);
  } catch (err) {
    res.redirect(`back`);
  }
});


articlesRouter.get(`/:id`, (req, res) => {
  return res.render(`pages/articles/post-detail`);
});

articlesRouter.get(`/edit/:id`, async (req, res) => {
  const articleId = req.params.id;
  const [article, categories] = await Promise.all([
    api.getArticle(articleId),
    api.getCategories(),
  ]);

  res.render(`pages/articles/post-edit`, {article, categories});
});

articlesRouter.get(`/category/:id`, (req, res) => res.render(`pages/articles/articles-by-category`));

module.exports = articlesRouter;
