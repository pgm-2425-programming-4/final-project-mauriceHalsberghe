import React from 'react';
import GroupedStatus from './GroupedStatus';

export default function GroupedTasks({ tasks, statuses }) {
  const grouped = groupTasksByProject(tasks);
  
  return (
    <>
      {Object.entries(grouped).map(([projectId, { project, tasks }]) => (
        <ProjectTasks key={projectId} project={project} tasks={tasks} statuses={statuses} />
      ))}
    </>
  );
}

function ProjectTasks({ project, tasks, statuses }) {
  return (
    <>
      <h2>{project.title}</h2>
      <GroupedStatus tasks={tasks} statuses={statuses} />
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
