import React, { useEffect, useState } from "react";
import { fetchTasksStatuses } from "../queries/fetch-tasks-statuses";
import { updateTask } from "../queries/update-task";

export function TaskModal({ task, onClose }) {
  const [statuses, setStatuses] = useState([]);
  const [selectedStatusId, setSelectedStatusId] = useState(
    task?.task_status?.id ?? ""
  );
  const [title, setTitle] = useState(task?.title ?? "");
  const [description, setDescription] = useState(task?.description || "");
  const [isEditing, setIsEditing] = useState(false);
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
    if (task) {
      setTitle(task.title);
      setDescription(task.description || "");
      setSelectedStatusId(task.task_status?.id ?? "");
    }
  }, [task]);

  const taskChange = async () => {
    if (!title || !selectedStatusId) {
      setError("title is required.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await updateTask(task.documentId, selectedStatusId, {
        title,
        description,
      });

      setIsEditing(false);
    } catch (err) {
      console.error("Error updating task:", err);
      setError("Failed to update task.");
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
          <img src="/xmark-solid.svg" alt="Close" />
        </button>

        <div className="modal__content">
          <div>
            <label>Title *</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              readOnly={!isEditing}
            />
          </div>

          <div>
            <label>Description</label>
            <textarea
              onChange={(e) => setDescription(e.target.value)}
              readOnly={!isEditing}
              value={description}
            ></textarea>
          </div>

          <div>
            <label>Status</label>
            <select
              value={selectedStatusId}
              onChange={(e) => setSelectedStatusId(e.target.value)}
              disabled={!isEditing}
            >
              {statuses.map((status) => (
                <option key={status.id} value={status.id}>
                  {status.name}
                </option>
              ))}
            </select>
          </div>

          {error && <p className="error">{error}</p>}
          {loading && <p>Saving</p>}

          <div className="modal__actions">
            {!isEditing ? (
              <button onClick={() => setIsEditing(true)}>Edit</button>
            ) : (
              <button onClick={taskChange} disabled={loading}>
                Save
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
