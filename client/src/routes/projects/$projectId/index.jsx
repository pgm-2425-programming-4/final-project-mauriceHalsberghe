import { createFileRoute, notFound, Link } from '@tanstack/react-router'
import { fetchTasks } from '../../../queries/fetch-tasks-by-projectid'
import { fetchTasksStatuses } from '../../../queries/fetch-tasks-statuses';
import { fetchTasksLabels } from '../../../queries/fetch-tasks-labels';
import GroupedTask from '../../../components/GroupedTask'


export const Route = createFileRoute('/projects/$projectId/')({
  loader: async ({ params }) => {
    const [tasks, statuses, labels] = await Promise.all([
      fetchTasks(params.projectId),
      fetchTasksStatuses(),
      fetchTasksLabels(),
    ]);

    if (!tasks) {
      throw notFound();
    }

    return { tasks, statuses, labels };
  },

  component: Tasks,
  notFoundComponent: () => <div>Project not found</div>
});

function Tasks() {
  const { tasks, statuses, labels } = Route.useLoaderData();

  return (
    <section className='main'>
      <GroupedTask tasks={tasks} statuses={statuses} labels={labels}/>
    </section>
  );
}