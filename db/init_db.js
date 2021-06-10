// code to build and initialize DB goes here
const {
  client,
  createLinks,
  createTags,
  // other db methods
} = require("./index");

async function dropTables() {
  // drop tables in correct order
  try {
    console.log("Dropping All Tables...");
    await client.query(`
    DROP TABLE IF EXISTS link_tags;
    DROP TABLE IF EXISTS tags;
    DROP TABLE IF EXISTS links;
   
    
`);
    console.log("Finished dropping tables!");
  } catch (error) {
    console.error("Error while dropping tables!");
    throw error;
  }
}

async function createTables() {
  // create all tables, in the correct order
  try {
    console.log("Starting to build tables...");
    await client.query(`
    CREATE TABLE tags(
      id SERIAL PRIMARY KEY,
      name TEXT UNIQUE NOT NULL
    );
    CREATE TABLE links(
      id SERIAL PRIMARY KEY,
      name TEXT UNIQUE NOT NULL,
      link TEXT NOT NULL,
      count INTEGER,
      comment VARCHAR(255) NOT NULL,
      "dateshared" DATE default CURRENT_DATE
    );
    CREATE TABLE link_tags(
      "linkId" INTEGER REFERENCES links(id),
      "tagId" INTEGER REFERENCES tags(id),
      UNIQUE("linkId", "tagId")
    );
`);
    console.log("Finished constructing tables!");
  } catch (error) {
    console.error("Error constructing tables!");
    throw error;
  }
}

async function createInitialLinks() {
  console.log("Starting to create initial links...");
  try {
    const linksToCreate = [
      {
        name: "Google",
        link: "https://www.google.com",
        count: 22,
        comment: "A search engine.",
      },
      {
        name: "Twitter",
        link: "https://www.twitter.com",
        count: 34,
        comment:
          "A microblogging system that allows you to send and receive short posts.",
      },
      {
        name: "Youtube",
        link: "Youtube.com",
        count: 13,
        comment: "TV Movies and Streaming.",
      },
    ];
    const links = await Promise.all(linksToCreate.map(createLinks));
    console.log("Links:");
    console.log(links);
    console.log("Finished creating links!");
  } catch (err) {
    console.error("There was a problem creating LINKS");
    throw err;
  }
}

async function createInitialTags() {
  console.log("Starting to create initial links...");
  try {
    const tagsToCreate = ["sharon", "eman", "class"];
    const tags = await createTags(tagsToCreate);
    console.log("Tags:");
    console.log(tags);
    console.log("Finished creating tags!");
  } catch (err) {
    console.error("There was a problem creating TAGS");
    throw err;
  }
}

async function populateInitialData() {
  try {
    await createInitialLinks();
    await createInitialTags();
  } catch (error) {
    throw error;
  }
}
async function buildTables() {
  try {
    client.connect();
    await dropTables();
    await createTables();
  } catch (error) {
    console.log("Error during buildTables");
    throw error;
  }
}

buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());
