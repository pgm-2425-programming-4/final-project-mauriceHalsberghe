import React from 'react';

export default function GroupedStatus({ tasks, statuses }) {

  const groupedByStatus = groupTasksByStatus(tasks);
  
  return (
    <div>
      {statuses.map(status => (
        <div key={status.id} style={{ marginBottom: '15px' }}>
          <h3>{status.name}</h3>
          <ul>
            {(groupedByStatus[status.id] || []).map(task => (
              <li key={task.id}>{task.title}</li>
            ))}
          </ul>
        </div>
      ))}

      {groupedByStatus['no-status'] && (
        <div>
          <h3>No Status</h3>
          <ul>
            {groupedByStatus['no-status'].map(task => (
              <li key={task.id}>{task.title}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function groupTasksByStatus(tasks) {
  const grouped = {};

  tasks.forEach(task => {
    const statusId = task.task_status?.id || 'no-status';
    if (!grouped[statusId]) {
      grouped[statusId] = [];
    }
    grouped[statusId].push(task);
  });

  return grouped;
}
