import axios from "axios";

export async function getSomething() {
  try {
    const { data } = await axios.get("/api");
    return data;
  } catch (error) {
    throw error;
  }
}

//GET /api/links
//GET /api/tags/:tagName/links
//POST /api/links
//PATCH PATCH /api/links/:id
