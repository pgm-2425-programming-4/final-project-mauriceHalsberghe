import React, { useState, useEffect } from "react";
import { EditTaskModal } from "./EditTaskModal";

export default function GroupedStatus({ tasks: initialTasks, statuses }) {
  const [tasks, setTasks] = useState(initialTasks);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    setTasks(initialTasks);
  }, [initialTasks]);

  const groupedByStatus = groupTasksByStatus(tasks);

  const updateTask = (updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((prevT) => (prevT.id === updatedTask.id ? updatedTask : prevT))
    );
    setSelectedTask(null);
  };

  const closeModal = () => {
    setSelectedTask(null);
  };

  const order = ["to do", "in progress", "done", "ready for view"];

  const sortedStatuses = [...statuses]
    .filter((status) => status.name.toLowerCase() !== "backlog")
    .sort((a, b) => {
      const indexA = order.indexOf(a.name.toLowerCase());
      const indexB = order.indexOf(b.name.toLowerCase());
      return indexA - indexB;
    });

  return (
    <div className="main__content">
      {sortedStatuses.map((status, index) => (
        <div className="status" key={status.id}>
          <h3 className={`status__title status__title--${index}`}>
            {status.name}
          </h3>
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
              <li key={task.id} onClick={() => setSelectedTask(task)}>
                {task.title}
              </li>
            ))}
          </ul>
        </div>
      )}

      {selectedTask && (
        <EditTaskModal
          task={selectedTask}
          onClose={closeModal}
          onSave={updateTask}
        />
      )}
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