import React, { useState } from "react";
import { TaskModal } from "./TaskModal";

export default function GroupedStatus({ tasks, statuses }) {
  const groupedByStatus = groupTasksByStatus(tasks);

  const [selectedTask, setSelectedTask] = useState(null);

  return (
    <div className="main__content">
      {statuses
        .filter((status) => status.name.toLowerCase() !== "backlog")
        .map((status) => (
          <div className="status" key={status.id}>
            <h3 className="status__title">{status.name}</h3>
            <ul className="status__list">
              {(groupedByStatus[status.id] || []).map((task) => (
                <li
                  className="card"
                  key={task.id}
                  onClick={() => setSelectedTask(task)}
                >
                  <h3 className="card__title">{task.title}</h3>
                  <ul className="card__labels">
                    {task.task_labels?.map((label) => (
                      <li className="card__label" key={label.id}>
                        {label.name}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        ))}

      {groupedByStatus["no-status"] && (
        <div>
          <h3>No Status</h3>
          <ul>
            {groupedByStatus["no-status"].map((task) => (
              <li key={task.id}>{task.title}</li>
            ))}
          </ul>
        </div>
      )}

      <TaskModal task={selectedTask} onClose={() => setSelectedTask(null)} />
    </div>
  );
}

function groupTasksByStatus(tasks) {
  const grouped = {};

  tasks.forEach((task) => {
    const statusId = task.task_status?.id || "no-status";
    if (!grouped[statusId]) {
      grouped[statusId] = [];
    }
    grouped[statusId].push(task);
  });

  return grouped;
}
