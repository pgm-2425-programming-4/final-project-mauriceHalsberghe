import { createFileRoute, notFound } from '@tanstack/react-router';
import { fetchTasks } from '../../../queries/fetch-tasks-by-projectid';

export const Route = createFileRoute('/projects/$projectId/backlog')({
  loader: async ({ params }) => {
    const [tasks] = await Promise.all([
      fetchTasks(params.projectId),
    ]);

    if (!tasks || tasks.length === 0) {
      throw notFound();
    }

    return { tasks };
  },

  component: BacklogPage,
  notFoundComponent: () => <div>Project not found</div>
});

function BacklogPage() {
  const { tasks } = Route.useLoaderData();
  console.log(tasks);
  
  const backlogTasks = tasks.filter(
    task => task.task_status.name === 'Backlog'
  );
  const project = tasks.length > 0 ? tasks[0].project : null;

  return (
    <section>
      <h2>Backlog for { project.title }</h2>

      {backlogTasks.length === 0 ? ( <p>No backlog tasks found</p>) : 
      (
        <ul>
          {backlogTasks.map(task => (
            <li key={task.id}>{task.title}</li>
          ))}
        </ul>
      )}
    </section>
  );
}
