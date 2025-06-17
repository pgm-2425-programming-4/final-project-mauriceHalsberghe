import React, { useState } from "react";
import GroupedStatus from "./GroupedStatus";
import { Link } from "@tanstack/react-router";
import { AddTaskModal } from "./AddTaskModal";

export default function GroupedTasks({ tasks, statuses, labels }) {
  const grouped = groupTasksByProject(tasks);

  return (
    <>
      {Object.entries(grouped).map(([projectId, { project, tasks }]) => (
        <ProjectTasks
          key={projectId}
          project={project}
          tasks={tasks}
          statuses={statuses}
          labels={labels}
        />
      ))}
    </>
  );
}

function ProjectTasks({ project, tasks: initialTasks, statuses, labels }) {
  const [showModal, setShowModal] = useState(false);
  const [tasks, setTasks] = useState(initialTasks);
  const [selectedLabel, setSelectedLabel] = useState("");

  const handleAddClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSave = (newTask) => {
    setTasks((prev) => [...prev, newTask]);
    setShowModal(false);
  };

  const filteredTasks = selectedLabel
    ? tasks.filter((task) =>
        task.task_labels?.some((label) => label.id === Number(selectedLabel))
      )
    : tasks;

  return (
    <>
      <header className="header">
        <div className="header__filters">
          <select className="header__select" value={selectedLabel} onChange={(e) => setSelectedLabel(e.target.value)}>
            <option value="">All Labels</option>
            {labels.map((label) => (
              <option key={label.id} value={label.id}>
                {label.name}
              </option>
            ))}
          </select>
        </div>
        <h2 className="header__title">{project.title}</h2>
        <Link
          to={`/projects/${project.documentId}/backlog`}
          className="header__link"
        >
          View backlog
        </Link>
        <button className="button" onClick={handleAddClick}>
          Add new Task
        </button>
      </header>

      <GroupedStatus tasks={filteredTasks} statuses={statuses} />

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

  tasks.forEach((task) => {
    const projectId = task.project.id;
    if (!grouped[projectId]) {
      grouped[projectId] = {
        project: task.project,
        tasks: [],
      };
    }
    grouped[projectId].tasks.push(task);
  });

  return grouped;
}
