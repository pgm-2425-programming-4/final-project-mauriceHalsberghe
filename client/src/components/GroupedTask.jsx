import React, { useState } from "react";
import GroupedStatus from "./GroupedStatus";
import { Link } from "@tanstack/react-router";
import { AddTaskModal } from "./AddTaskModal";

export default function GroupedTasks({ tasks, statuses, labels, project }) {
  const grouped = groupTasksByProject(tasks);
  
  const hasGroups = Object.keys(grouped).length > 0;
  
  if (hasGroups) {
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

  return (
    <ProjectTasks
      project={project}
      tasks={[]}
      statuses={statuses}
      labels={labels}
    />
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
        <div className="header__row">
          <div className="breadcrumbs">
              <img className="breadcrumbs__img" src="/assets/shell32_264.ico"/>
              <Link className="breadcrumbs__title" to={'/'}>Kanban</Link>
              <Link className="breadcrumbs__title" to={'/projects'}>Projects</Link>
              <Link className="breadcrumbs__title" to={'./'}>{project.title}</Link>
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
              placeholder="Search task"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="header__buttons">
          <Link
            to={`/projects/${project.documentId}/backlog`}
            className="button"
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
