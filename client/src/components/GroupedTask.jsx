import React, { useEffect, useState } from "react";
import { fetchTasksStatuses } from "../queries/fetch-tasks-statuses";

export default function GroupedTaskList({ tasks }) {
  const [statuses, setStatuses] = useState([]);

  useEffect(() => {
    fetchTasksStatuses().then((result) => {
      const filtered = (result.data || []).filter(
        (status) => status.name !== "Backlog"
      );
      setStatuses(filtered);
    });
  }, []);

    const tasksGroupedByStatus = tasks.reduce((groupedTasks, task) => {
    const statusId = task.task_status.id;

    if (!groupedTasks[statusId]) {
        groupedTasks[statusId] = [];
    }
    groupedTasks[statusId].push(task);

    return groupedTasks;
    }, {});


  return (
    <div>
      {statuses.map((status) => (
        <div key={status.id}>
          <br />
          <h2>{status.name}:</h2>
          <ul>
            {(tasksGroupedByStatus[status.id] || []).map((task) => (
              <li key={task.id}>{task.title}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
