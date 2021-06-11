const apiRouter = require("express").Router();

const {
  createLink,
  getAllTags,
  getAllLinks,
  getLinkById,
  createTags,
  getTagbyId,
  getLinksByTagName,
  addTagsToLink,
  createLinkTag,
} = require("../db");

// LINK routes
apiRouter.get("/links", async (req, res, next) => {
  try {
    const theLinks = await getAllLinks();

    res.send({ links: theLinks });
  } catch (error) {
    next(error);
  }
});

// TODO
// POST /api/links (creates tags during link creation)
// PATCH /api/links/:id (used both to update comment/tags as well as to increment the click count)

// TAG routes
apiRouter.get("/tags", async (req, res, next) => {
  try {
    const theTags = await getAllTags();

    res.send({ tags: theTags });
  } catch (error) {
    next(error);
  }
});

apiRouter.get("/tags/:tagName/links", async (req, res, next) => {
  const { tagName } = req.params;
  try {
    const links = await getLinksByTagName(tagName);

    res.send({ links });
  } catch (error) {
    next(error);
  }
});

apiRouter.get("/", (req, res, next) => {
  res.send({
    message: "API is under construction!",
  });
});

apiRouter.use((error, req, res, next) => {
  res.send(error);
});

module.exports = apiRouter;
