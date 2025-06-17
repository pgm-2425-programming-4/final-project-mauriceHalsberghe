import React, { useEffect, useState } from "react";
import { fetchTasksStatuses } from "../queries/fetch-tasks-statuses";
import { updateTask } from "../queries/update-task";
import { fetchLabels } from "../queries/fetch-labels";

export function EditTaskModal({ task, onClose, onSave }) {
  const [statuses, setStatuses] = useState([]);
  const [selectedStatusId, setSelectedStatusId] = useState(
    task?.task_status?.id ?? ""
  );
  const [labels, setLabels] = useState([]);
  const [selectedLabelIds, setSelectedLabelIds] = useState([]);

  const [title, setTitle] = useState(task?.title ?? "");
  const [description, setDescription] = useState(task?.description || "");
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData() {
      const [statusData, labelData] = await Promise.all([
        fetchTasksStatuses(),
        fetchLabels(),
      ]);
      console.log(labelData);
      setStatuses(statusData);
      setLabels(labelData);
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description || "");
      setSelectedStatusId(task.task_status?.id ?? "");
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
        labels: selectedLabelIds,
      });

      const fullUpdatedTask = {
        ...task,
        title,
        description,
        task_status: {
          id: selectedStatusId,
          name: statuses.find((s) => s.id === selectedStatusId)?.name || "",
        },
        task_labels: labels.filter((label) =>
          selectedLabelIds.includes(label.id)
        ),
      };

      if (onSave) {
        onSave(fullUpdatedTask);
      }

      setIsEditing(false);
    } catch (err) {
      console.error("Error updating task:", err);
      setError("Failed to update task.");
    } finally {
      setLoading(false);
    }
  };

  if (!task || labels.length === 0) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-bg" onClick={onClose}></div>
      <div className="modal__card">
        <div className="modal__header">
          <h2 className="modal__title">Edit Task</h2>
          <button className="button button--close" onClick={onClose}>
            <img src="/xmark-solid.svg" alt="Close" />
          </button>
        </div>

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

          <div>
            <label>Labels</label>
            <div className="modal__labels">
              {labels.map((label) => {
                const isSelected = selectedLabelIds.includes(label.id);
                return (
                  <button
                    key={label.id}
                    type="button"
                    className={`button button--label ${isSelected ? "selected" : ""} ${
                      !isEditing ? "disabled" : ""
                    }`}
                    onClick={
                      isEditing ? () => toggleLabel(label.id) : undefined
                    }
                    disabled={!isEditing}
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
            {!isEditing ? (
              <button className="button" onClick={() => setIsEditing(true)}>
                Edit
              </button>
            ) : (
              <button
                className="button"
                onClick={taskChange}
                disabled={loading}
              >
                Save
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
