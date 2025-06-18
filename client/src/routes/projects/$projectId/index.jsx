import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { fetchTasks } from "../../../queries/fetch-tasks-by-projectid";
import { fetchTasksStatuses } from "../../../queries/fetch-tasks-statuses";
import { fetchTasksLabels } from "../../../queries/fetch-tasks-labels";
import { fetchProjectById } from "../../../queries/fetch-project-by-id";
import GroupedTask from "../../../components/GroupedTask";

export const Route = createFileRoute("/projects/$projectId/")({
  loader: async ({ params }) => {
    const [tasks, statuses, labels, project] = await Promise.all([
      fetchTasks(params.projectId),
      fetchTasksStatuses(),
      fetchTasksLabels(),
      fetchProjectById(params.projectId),
    ]);
    
    if (!project) {
      throw notFound();
    }

    if (!tasks) {
      throw notFound();
    }

    return { tasks, statuses, labels, project };
  },

  component: Tasks,
  notFoundComponent: () => (
    <div className="error">
      <h1 className="error__title">Error</h1>
      <div className="error__content">
        <img className="error__img" src="/assets/DxpTaskSync_62.ico" />
        <p className="error__message">Project not found</p>
      </div>
      <Link className="button button--error" to={"/"}>
        Home
      </Link>
    </div>
  ),
});

function Tasks() {
  const { tasks, statuses, labels, project } = Route.useLoaderData();

  return (
    <section className="main">
      <GroupedTask
        tasks={tasks}
        statuses={statuses}
        labels={labels}
        project={project}
      />
    </section>
  );
}
