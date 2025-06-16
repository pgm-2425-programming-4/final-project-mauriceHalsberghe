import React from "react";

export function TaskModal({ task }) {
  if (!task) {
    return null;
  }

  return (
    <div className="modal-bg">
      <div className="modal">
        <div>
          <label>Title</label>
          <input value={task.title} />
        </div>

        <div>
          <label>Description</label>
          <input value={task.description} />
        </div>

        <div>
          <label>Status</label>
          <opiton></opiton>
          <select></select>
        </div>
      </div>
    </div>
  );
}
