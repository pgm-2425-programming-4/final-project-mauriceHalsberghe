import React from "react";

export default function GroupedTaskList({ tasks }) {
  const groupedTasks = groupTasksByProject(tasks);

  console.log(groupedTasks);
  
  return (
    <div>
      {Object.entries(groupedTasks).map(([projectId, { project, tasks }]) => (
        <ProjectTasks key={projectId} project={project} tasks={tasks} />
      ))}
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
  console.log(grouped);
  
  return grouped;
}