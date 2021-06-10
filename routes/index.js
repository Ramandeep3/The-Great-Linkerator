const apiRouter = require("express").Router();

const { getAllLinks, getAllTags } = require("../db");

apiRouter.get("/", (req, res, next) => {
  res.send({
    message: "API is under construction!",
  });
});

apiRouter.get("/links", async (req, res, next) => {
  try {
    const theLinks = await getAllLinks();

    res.send({ links: theLinks });
  } catch (error) {
    next(error);
  }
});

apiRouter.get("/tags", async (req, res, next) => {
  try {
    const theTags = await getAllTags();

    res.send({ tags: theTags });
  } catch (error) {
    next(error);
  }
});

module.exports = apiRouter;
