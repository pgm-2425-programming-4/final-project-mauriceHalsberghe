import { API_URL, API_TOKEN } from "../constants/constants";

export async function addTask(statusId, data) {
  
  const response = await fetch(`${API_URL}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_TOKEN}`,
    },
    body: JSON.stringify({
      data: {
        title: data.title,
        description: data.description,
        task_status: statusId,
        project: data.project,
        task_labels: data.labels,
      },
    }),
  });
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error?.message || "error adding task");
  }

  return await response.json();
}
