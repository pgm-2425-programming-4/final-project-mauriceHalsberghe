import React, { useState } from "react";
import GroupedStatus from "./GroupedStatus";
import { Link } from "@tanstack/react-router";
import { AddTaskModal } from "./AddTaskModal";

export default function GroupedTasks({ tasks, statuses }) {
  const grouped = groupTasksByProject(tasks);

  return (
    <>
      {Object.entries(grouped).map(([projectId, { project, tasks }]) => (
        <ProjectTasks
          key={projectId}
          project={project}
          tasks={tasks}
          statuses={statuses}
        />
      ))}
    </>
  );
}

function ProjectTasks({ project, tasks, statuses }) {
  const [showModal, setShowModal] = useState(false);

  const handleAddClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSave = (newTask) => {
    console.log("new task:",newTask);
    setShowModal(false);
  };

  return (
    <>
      <header className='header'>
        <h2 className='header__title'>{project.title}</h2>
        <Link to={`/projects/${project.documentId}/backlog`} className="header__link">View backlog</Link>
        <button className="button" onClick={handleAddClick}>+ Add Task</button>
      </header>
      <GroupedStatus tasks={tasks} statuses={statuses} />
      {showModal && (
        <AddTaskModal
          task={null}
          projectId={project.documentId}
          onClose={handleCloseModal}
          onSave={handleSave}
        />
      )}
    </>
  );
}


function groupTasksByProject(tasks) {
  const grouped = {};

  tasks.forEach(task => {
    const projectId = task.project.id;
    if (!grouped[projectId]) {
      grouped[projectId] = {
        project: task.project,
        tasks: []
      };
    }
    grouped[projectId].tasks.push(task);
  });

  return grouped;
}
