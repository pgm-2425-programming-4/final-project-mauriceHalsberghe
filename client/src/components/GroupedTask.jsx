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
  const [searchTerm, setSearchTerm] = useState("");


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

  const filteredTasks = tasks.filter((task) => {
    const matchesLabel = selectedLabel
      ? task.task_labels?.some((label) => label.id === Number(selectedLabel))
      : true;

    const matchesSearch = searchTerm.trim()
      ? task.title.toLowerCase().includes(searchTerm.toLowerCase())
      : true;

    return matchesLabel && matchesSearch;
  });

  return (
    <>
      <header className="header">

        <div className="breadcrumbs">
            <img className="breadcrumbs__img" src="/assets/shell32_264.ico"/>
            <h2 className="breadcrumbs__title">Kanban</h2>
            <h2 className="breadcrumbs__title">Projects</h2>
            <h2 className="breadcrumbs__title">{project.title}</h2>
        </div>
        
        <div className="header__content">
          <select className="header__select" value={selectedLabel} onChange={(e) => setSelectedLabel(e.target.value)}>
            <option value="">All Labels</option>
            {labels.map((label) => (
              <option key={label.id} value={label.id}>
                {label.name}
              </option>
            ))}
          </select>
          <input
            className="header__input"
            placeholder="Filter name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>


        <div className="header__content">
          <Link
            to={`/projects/${project.documentId}/backlog`}
            className="header__link"
          >
            View backlog
          </Link>
          <button className="button" onClick={handleAddClick}>
            Add new Task
          </button>
        </div>
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
