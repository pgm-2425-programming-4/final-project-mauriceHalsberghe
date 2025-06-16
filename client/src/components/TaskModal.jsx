import React, { useEffect, useState } from "react";
import { fetchTasksStatuses } from "../queries/fetch-tasks-statuses";

export function TaskModal({ task, onClose }) {
  const [statuses, setStatuses] = useState([]);

  useEffect(() => {
    async function fetchStatuses() {
      const data = await fetchTasksStatuses();
      setStatuses(data);
    }
    fetchStatuses();
  }, []);

  if (!task) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-bg" onClick={onClose}></div>

      <div className="modal__card">
        <button className="button button--close" onClick={onClose}>
          <img src="/xmark-solid.svg" />
        </button>

        <div className="modal__content">
          <div>
            <label>Title</label>
            <input value={task.title} readOnly />
          </div>

          <div>
            <label>Description</label>
            <textarea readOnly >
              {task.description}
            </textarea>
          </div>

          <div>
            <label>Status</label>
            <select value={task.task_status?.id} readOnly>
              {statuses.map((status) => (
                <option key={status.id} value={status.id}>
                  {status.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
