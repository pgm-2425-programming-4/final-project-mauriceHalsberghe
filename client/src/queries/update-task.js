import { API_URL, API_TOKEN } from "../constants/constants";

export async function updateTask(taskId, newStatusId) {

  const response = await fetch(`${API_URL}/tasks/${taskId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_TOKEN}`,
    },
    body: JSON.stringify({
      data: {
        task_status: newStatusId
      }
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error?.message || "Failed to update task");
  }

  return await response.json();
}
