import React from "react";

export function TaskModal({ task, onClose }) {
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
            <input value={task.title} />
          </div>

          <div>
            <label>Description</label>
            <textarea name="" id="">{task.description}</textarea>
          </div>

          <div>
            <label>Status</label>
            <select>
              <option>1</option>
              <option>1</option>
              <option>1</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
