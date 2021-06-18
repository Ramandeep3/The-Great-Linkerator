import axios from "axios";

export async function getTags() {
  try {
    const { data } = await axios.get("/api/tags");
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getLinks() {
  try {
    const { data } = await axios.get("/api/links");
    return data.links;
  } catch (error) {
    throw error;
  }
}

export async function createNewLinks([name, link, comment, tags] = "") {
  try {
    const { data } = await axios.post("/api/links", {
      name: name,
      link: link,
      comment: comment,
      tags: tags,
    });
    console.log(data);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function linksWithTags(tagName) {
  try {
    const { data } = await axios.get(`/api/tags/${tagName}/links`);
    return data.links;
  } catch (error) {
    throw error;
  }
}

export async function updateLinks(linkId, updatedLink) {
  try {
    const { data } = await axios.patch(`/api/links/${linkId.id}`, updatedLink);
    return data;
  } catch (error) {
    throw error;
  }
}

// / export async function deleteLink(linkId) {
//   try {
//     const { data } = await axios.delete(`/api/links/${linkId.id}`);
//     return data;
//   } catch (error) {
//     throw error;
//   }
// }
