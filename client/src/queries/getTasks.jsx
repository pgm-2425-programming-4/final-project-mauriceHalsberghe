import  { API_TOKEN, API_URL } from "../constants/constants.js"

export async function getTasks({ page, pageSize, projectId }) {

  const result = await fetch(
    `${API_URL}/tasks?populate=*&pagination[page]=${page}&pagination[pageSize]=${pageSize}&filters[project][id][$eq]=${projectId}`,
  {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${API_TOKEN}`,
    },
  });

  const data = await result.json();    
  return data;
}