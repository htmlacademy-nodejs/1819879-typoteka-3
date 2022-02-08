'use strict';

const {Router} = require(`express`);
const {HttpCode} = require(`./../../../constants`);

const routeSearch = new Router();

module.exports = (appRoute, searchService) => {
  appRoute.use(`/search`, routeSearch);

  routeSearch.get(`/`, (req, res) => {
    const {query} = req.query;

    if (!query) {
      res.status(HttpCode.BAD_REQUEST).json(``);
      return;
    }

    const searchResult = searchService.search(query);
    const searchStatus = searchResult.length > 0 ? HttpCode.OK : HttpCode.NOT_FOUND;

    res.status(searchStatus).json(searchResult);
  });
};
