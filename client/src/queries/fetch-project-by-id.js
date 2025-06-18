import { API_TOKEN, API_URL } from "../constants/constants.js";

export async function fetchProjectById(projectId) {
  let fetchUrl = `${API_URL}/projects/${projectId}`;

  const result = await fetch(fetchUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_TOKEN}`,
    },
  });

  const data = await result.json();

  return data.data;
}
