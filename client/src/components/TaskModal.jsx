import React from "react";

export function TaskModal({ task }) {
  if(!task) {
    return
  }

  return (
    <div>
      <h2>{task.title}</h2>
    </div>
  );
}
