import { createFileRoute, notFound, Link } from '@tanstack/react-router'
import { fetchTasks } from '../../../queries/fetch-tasks-by-projectid'
import { fetchTasksStatuses } from '../../../queries/fetch-tasks-statuses';
import GroupedTask from '../../../components/GroupedTask'


export const Route = createFileRoute('/projects/$projectId/')({
  loader: async ({ params }) => {
    const [tasks, statuses] = await Promise.all([
      fetchTasks(params.projectId),
      fetchTasksStatuses()
    ]);

    if (!tasks || tasks.length === 0) {
      throw notFound();
    }

    return { tasks, statuses };
  },

  component: Tasks,
  notFoundComponent: () => <div>Project not found</div>
});

function Tasks() {
  const { tasks, statuses } = Route.useLoaderData();

  return (
    <section className='main'>
      <GroupedTask tasks={tasks} statuses={statuses} />
    </section>
  );
}