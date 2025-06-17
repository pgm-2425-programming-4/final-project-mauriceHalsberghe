import React, { useEffect, useState } from "react";
import { fetchTasksStatuses } from "../queries/fetch-tasks-statuses";
import { addTask } from "../queries/add-task";

export function AddTaskModal({ task, projectId, onClose, onSave }) {
  const [statuses, setStatuses] = useState([]);
  const [selectedStatusId, setSelectedStatusId] = useState(
    task?.task_status?.id ?? ""
  );
  const [title, setTitle] = useState(task?.title ?? "");
  const [description, setDescription] = useState(task?.description || "");
  const [isEditing] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchStatuses() {
      const data = await fetchTasksStatuses();
      setStatuses(data);

      if (!task && data.length > 0) {
        setSelectedStatusId(data[0].id);
      }
    }

    fetchStatuses();
  }, []);

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description || "");
      setSelectedStatusId(task.task_status.id || "");
    }
  }, [task]);

  const taskAdd = async () => {
    if (!title) {
      setError("Title is required.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      let newTask;
      const response = await addTask(selectedStatusId, {
        title,
        description,
        project: projectId,
        status: selectedStatusId,
      });

      newTask = {
        ...response.data,
        task_status: {
          id: selectedStatusId,
          name: statuses.find((s) => s.id === selectedStatusId)?.name || "",
        },
      };

      if (onSave) {
        onSave(newTask);
      }
    } catch (err) {
      console.error("Error updating task:", err);
      setError("Failed to add task.");
    } finally {
      setLoading(false);
    }
  };

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
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              readOnly={!isEditing}
            />
          </div>

          <div>
            <label>Description</label>
            <textarea
              name="description"
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
            <button className="button" onClick={taskAdd} disabled={loading}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
