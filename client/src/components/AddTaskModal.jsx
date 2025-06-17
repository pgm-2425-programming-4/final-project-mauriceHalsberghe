import React, { useEffect, useState } from "react";
import { fetchTasksStatuses } from "../queries/fetch-tasks-statuses";
import { fetchLabels } from "../queries/fetch-labels"; // Ensure this exists
import { addTask } from "../queries/add-task";

export function AddTaskModal({ task, projectId, onClose, onSave }) {
  const [statuses, setStatuses] = useState([]);
  const [labels, setLabels] = useState([]);

  const [selectedStatusId, setSelectedStatusId] = useState(
    task?.task_status?.id ?? ""
  );
  const [selectedLabelIds, setSelectedLabelIds] = useState([]);

  const [title, setTitle] = useState(task?.title ?? "");
  const [description, setDescription] = useState(task?.description || "");
  const [isEditing] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData() {
      const [statusData, labelData] = await Promise.all([
        fetchTasksStatuses(),
        fetchLabels(),
      ]);
      setStatuses(statusData);
      setLabels(labelData);

      if (!task && statusData.length > 0) {
        setSelectedStatusId(statusData[0].id);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description || "");
      setSelectedStatusId(task.task_status.id || "");
      setSelectedLabelIds(task.task_labels?.map((l) => l.id) || []);
    }
  }, [task]);

  const toggleLabel = (labelId) => {
    setSelectedLabelIds((prev) =>
      prev.includes(labelId)
        ? prev.filter((id) => id !== labelId)
        : [...prev, labelId]
    );
  };

  const taskAdd = async () => {
    if (!title) {
      setError("Title is required.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await addTask(selectedStatusId, {
        title,
        description,
        project: projectId,
        status: selectedStatusId,
        labels: selectedLabelIds,
      });

      const newTask = {
        ...response.data,
        task_status: {
          id: selectedStatusId,
          name: statuses.find((s) => s.id === selectedStatusId)?.name || "",
        },
        task_labels: labels.filter((l) => selectedLabelIds.includes(l.id)),
      };

      if (onSave) {
        onSave(newTask);
      }
    } catch (err) {
      console.error("Error adding task:", err);
      setError("Failed to add task.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal">
      <div className="modal-bg" onClick={onClose}></div>

      <div className="modal__card">

        <div className="modal__header">
          <h2 className="modal__title">Add new task</h2>
          <button className="button button--close" onClick={onClose}>
            <img src="/xmark-solid.svg" alt="Close" />
          </button>
        </div>

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
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              readOnly={!isEditing}
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

          <div>
            <label>Labels</label>
            <div className="modal__labels">
              {labels.map((label) => {
                const isSelected = selectedLabelIds.includes(label.id);
                return (
                  <button
                    key={label.id}
                    type="button"
                    className={`button button--label ${isSelected ? "selected" : ""}`}
                    onClick={() => toggleLabel(label.id)}
                  >
                    {label.name}
                  </button>
                );
              })}
            </div>
          </div>

          {error && <p className="error">{error}</p>}
          {loading && <p>Saving</p>}

          <div className="modal__buttons">
            <button className="button" onClick={onClose}>
              Cancel
            </button>
            <button className="button" onClick={taskAdd} disabled={loading}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
