import { API_URL, API_TOKEN } from "../constants/constants";

export async function addProject( data) {
  
  const response = await fetch(`${API_URL}/projects`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_TOKEN}`,
    },
    body: JSON.stringify({
      data: {
        title: data.title,
      },
    }),
  });
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error?.message || "error adding project");
  }

  return await response.json();
}
