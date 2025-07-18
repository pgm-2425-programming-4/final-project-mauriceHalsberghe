import { API_TOKEN, API_URL } from "../constants/constants.js";

export async function fetchTasksLabels() {
  const response = await fetch(`${API_URL}/task-labels`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_TOKEN}`,
    },
  });

  const data = await response.json();

  return data.data;
}
