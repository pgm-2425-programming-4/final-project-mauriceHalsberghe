import { API_TOKEN, API_URL } from "../constants/constants.js";

export async function fetchTasks(projectId) {
  let fetchUrl = `${API_URL}/tasks?populate=*&filters[project][documentId][$eq]=${projectId}`;

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
