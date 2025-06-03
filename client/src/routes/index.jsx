import { createFileRoute, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { fetchProjects } from "../queries/fetch-projects";
import { fetchTasks } from "../queries/fetch-tasks";
import GroupedTask from "../components/GroupedTask";

export const Route = createFileRoute("/")({
  loader: async () => {
    const projects = await fetchProjects();
    if (!projects) throw notFound();
    return { projects };
  },

  component: Index,
  notFoundComponent: ({ data }) => {
    if (data.data === "INVALID_ROUTE") {
      return <div>Invalid route</div>;
    }
    return <div>No data found</div>;
  },
});

function Index() {
  const { projects } = Route.useLoaderData();
  const [selectedProjectId, setSelectedProjectId] = useState(
    projects.data?.[0]?.id ?? null
  );
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (selectedProjectId != null) {
      fetchTasks(selectedProjectId).then((result) => {
        setTasks(result.data || []);
      });
    }
  }, [selectedProjectId]);

  return (
    <main>
      <div className="aside">
        <ul className="aside__list">
          {projects.data.map((project) => (
            <li key={project.id} className="aside__item">
              <button onClick={() => setSelectedProjectId(project.id)}>
                {project.title}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <GroupedTask tasks={tasks} />
    </main>
  );
}