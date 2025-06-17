import React, { useState, useEffect } from "react";
import { TaskModal } from "./TaskModal";

export default function GroupedStatus({ tasks: initialTasks, statuses }) {
  const [tasks, setTasks] = useState(initialTasks);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    setTasks(initialTasks); 
  }, [initialTasks]);

  const groupedByStatus = groupTasksByStatus(tasks);

  const updateTask = (updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((t) => (t.id === updatedTask.id ? updatedTask : t))
    );
    setSelectedTask(null);
  }

  const closeModal = () => {
    setSelectedTask(null);
  };

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
              <li key={task.id} onClick={() => setSelectedTask(task)}>
                {task.title}
              </li>
            ))}
          </ul>
        </div>
      )}

      {selectedTask && (
        <TaskModal task={selectedTask} onClose={closeModal} onSave={updateTask}/>
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
