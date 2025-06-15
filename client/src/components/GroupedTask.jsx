import React from 'react';

export default function GroupedTasks({ tasks }) {
  const grouped = groupTasksByProject(tasks);

  return (
    <div>
      {Object.entries(grouped).map(([projectId, { project, tasks }]) => (
        <ProjectTasks key={projectId} project={project} tasks={tasks} />
      ))}
    </div>
  );
}

function ProjectTasks({ project, tasks }) {
  return (
    <div>
      <h2>{project.title}</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>{task.title}</li>
        ))}
      </ul>
    </div>
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