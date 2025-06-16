import React, { useEffect, useState } from "react";
import { fetchTasksStatuses } from "../queries/fetch-tasks-statuses";
import { updateTask } from "../queries/update-task";

export function TaskModal({ task, onClose }) {
  const [statuses, setStatuses] = useState([]);
  const [selectedStatusId, setSelectedStatusId] = useState(
    () => task?.task_status?.id ?? ""
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchStatuses() {
      const data = await fetchTasksStatuses();
      setStatuses(data);
    }
    fetchStatuses();
  }, []);

  useEffect(() => {
    if (task?.task_status?.id) {
      setSelectedStatusId(task.task_status.id);
    }
  }, [task]);

  const taskChange = async (e) => {
    const newStatusId = e.target.value;
    setSelectedStatusId(newStatusId);
    setLoading(true);
    setError("");

    try {
      await updateTask(task.documentId, newStatusId);
    } catch (err) {
      console.error("error:", err);
      setError("error editing task");
    } finally {
      setLoading(false);
    }
  };

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
            <textarea readOnly>{task.description}</textarea>
          </div>

          <div>
            <label>Status</label>
            <select value={selectedStatusId} onChange={taskChange}>
              {statuses.map((status) => (
                <option key={status.id} value={status.id}>
                  {status.name}
                </option>
              ))}
            </select>
          </div>

          {loading && <p>Updating...</p>}
          {error && <p className="error">{error}</p>}
        </div>
      </div>
    </div>
  );
}
