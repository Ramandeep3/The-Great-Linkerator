const { Client } = require("pg");
const client = new Client({
  connectionString:
    process.env.DATABASE_URL || "postgres://localhost:5432/linkerator",
  ssl:
    process.env.NODE_ENV === "production" 
    ? { rejectUnauthorized: false } : undefined,
});

// LINK database methods
async function createLink({ name, link, count, comment, tags = [] }) {
  if (!count) { count = 0};
  try {
    const {
      rows: [links],
    } = await client.query(
      `
        INSERT INTO link(name, link, count, comment)
        VALUES($1, $2, $3, $4)
        ON CONFLICT (name) DO NOTHING
        RETURNING *;
      `,
      [name, link, count, comment]
    );

    const tagList = await createTags(tags);
    return await addTagsToLink(links.id, tagList);
  } catch (err) {
    console.error("Could not create any links", err);
    throw err;
  }
}

async function getAllLinks() {
  try {
    const { rows: idList } = await client.query(`
      SELECT id 
      FROM link;
    `);
    const links = await Promise.all(idList.map((link) => getLinkById(link.id)));
    return links;
  } catch (err) {
    console.error("could not get all links", err);
    throw err;
  }
}

async function getLinkById(id) {
  try {
    const {
      rows: [link],
    } = await client.query(
      `
        SELECT *
        FROM link
        WHERE id=$1;
      `,
      [id]
    );
    if (!link) {
      throw {
        name: "not found",
        message: "count not find link with id",
      };
    }
    const { rows: tags } = await client.query(
      `SELECT tags.*
      FROM tags
      JOIN link_tags ON tags.id=link_tags."tagId"
      WHERE link_tags."linkId"=$1;
      `,
      [id]
    );
    link.tags = tags;
    return link;
  } catch (err) {
    console.error("could not get links by id", err);
    throw err;
  }
}

async function deleteLink(linkId) {
  console.log("YOOO")
  try {
    await client.query(
      `
        DELETE FROM link_tags
        WHERE "linkId"=$1;
      `, [linkId]
    );

    await client.query(
      `
        DELETE FROM link
        WHERE id=$1;
      `, [linkId]
    );
      console.log("I fired " + linkId);
    return `Deleted Link: ${linkId}`;
  } catch (err) {
    console.error("Deletion Error: ", err);
    throw err;
  }
}

// TAG database methods
async function getAllTags() {
  try {
    const { rows } = await client.query(`SELECT * FROM tags;`);

    return { rows };
  } catch (err) {
    console.error("could not get all tags", err);
    throw err;
  }
}

async function createTags(tagList) {
  if (tagList.length === 0) {
    return [];
  }

  const insertValues = tagList.map((_, index) => `$${index + 1}`).join("), (");
  const selectValues = tagList.map((_, index) => `$${index + 1}`).join(", ");

  try {
    await client.query(
      ` INSERT INTO tags(name)
        VALUES(${insertValues})
        ON CONFLICT (name) DO NOTHING;
    `,
      tagList
    );

    const { rows } = await client.query(
      `
    SELECT * FROM tags
    WHERE name
    IN (${selectValues});
    `,
      tagList
    );
    return rows;
  } catch (err) {
    console.error("could not create tags", err);
    throw err;
  }
}

async function updateLink(linkId, fields = {}) {
  const { tags } = fields;
  delete fields.tags;

  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");

  try {
    if (setString.length > 0) {
      await client.query(
        `
        UPDATE link
        SET ${setString}
        WHERE id=${linkId}
        RETURNING *;
      `,
        Object.values(fields)
      );
    }

    // return early if there's no tags to update
    if (tags === undefined) {
      return await getLinkById(linkId);
    }

    // make any new tags that need to be made
    const tagList = await createTags(tags);
    const tagListIdString = tagList.map((tag) => `${tag.id}`).join(", ");

    // delete any link_tags from the database which aren't in that tagList
    await client.query(
      `
      DELETE FROM link_tags
      WHERE "tagId"
      NOT IN (${tagListIdString})
      AND "linkId"=$1;
    `,
      [linkId]
    );

    // and create link_tags as necessary
    await addTagsToLink(linkId, tagList);

    return await getLinkById(linkId);
  } catch (err) {
    console.error("could not update link", err);
    throw err;
  }
}

// LINK and TAG database methods
async function getLinksByTagName(tagName) {
  try {
    const { rows: tagIds } = await client.query(
      `
      SELECT link.id
      FROM link
      JOIN link_tags ON link.id=link_tags."linkId"
      JOIN tags ON tags.id=link_tags."tagId"
      WHERE tags.name=$1;
    `,
      [tagName]
    );

    return await Promise.all(tagIds.map((link) => getLinkById(link.id)));
  } catch (err) {
    console.error("could not get links by tag name", err);
    throw err;
  }
}

async function createLinkTag(linkId, tagId) {
  try {
    await client.query(
      `
      INSERT INTO link_tags("linkId", "tagId")
      VALUES ($1, $2)
      ON CONFLICT ("linkId", "tagId") DO NOTHING;
    `,
      [linkId, tagId]
    );
  } catch (err) {
    console.error("could not create link-tag", err);
    throw err;
  }
}

async function addTagsToLink(linkId, tagList) {
  try {
    const createTagPromises = tagList.map((tag) =>
      createLinkTag(linkId, tag.id)
    );

    await Promise.all(createTagPromises);

    return await getLinkById(linkId);
  } catch (err) {
    console.error("could not add tag to link", err);
    throw err;
  }
}

const updateClickCount = async (linkId) => {
  try {
    const { rows } = await client.query(
      `
        UPDATE link
        SET count = count + 1
        WHERE id = $1;
      `, [linkId]
    );
  } catch (err) {
    throw error;
  }
}

// export db methods
module.exports = {
  client,
  createLink,
  getAllTags,
  getAllLinks,
  getLinkById,
  createTags,
  getLinksByTagName,
  addTagsToLink,
  createLinkTag,
  updateLink,
  updateClickCount,
  deleteLink
};
