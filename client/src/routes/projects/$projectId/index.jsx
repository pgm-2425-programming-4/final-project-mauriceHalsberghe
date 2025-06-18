import { createFileRoute, notFound, Link } from '@tanstack/react-router'
import { fetchTasks } from '../../../queries/fetch-tasks-by-projectid'
import { fetchTasksStatuses } from '../../../queries/fetch-tasks-statuses';
import { fetchTasksLabels } from '../../../queries/fetch-tasks-labels';
import { fetchProjectById } from '../../../queries/fetch-project-by-id';
import GroupedTask from '../../../components/GroupedTask'



export const Route = createFileRoute('/projects/$projectId/')({
  loader: async ({ params }) => {
    const [tasks, statuses, labels, project] = await Promise.all([
      fetchTasks(params.projectId),
      fetchTasksStatuses(),
      fetchTasksLabels(),
      fetchProjectById(params.projectId)
    ]);

    if (!tasks) {
      throw notFound();
    }


    return { tasks, statuses, labels, project };
  },

  component: Tasks,
  notFoundComponent: () => <div>Project not found</div>
});

function Tasks() {
  const { tasks, statuses, labels, project } = Route.useLoaderData();

  return (
    <section className='main'>
      <GroupedTask tasks={tasks} statuses={statuses} labels={labels} project={project}/>
    </section>
  );
}