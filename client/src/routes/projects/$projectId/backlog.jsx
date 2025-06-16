import { createFileRoute, notFound } from "@tanstack/react-router";
import { fetchTasks } from "../../../queries/fetch-tasks-by-projectid";
import React, { useState } from "react";
import { Pagination } from "../../../components/Pagination";

export const Route = createFileRoute("/projects/$projectId/backlog")({
  loader: async ({ params }) => {
    const [tasks] = await Promise.all([fetchTasks(params.projectId)]);

    if (!tasks || tasks.length === 0) {
      throw notFound();
    }

    return { tasks };
  },

  component: BacklogPage,
  notFoundComponent: () => <div>Project not found</div>,
});

function BacklogPage() {
  const { tasks } = Route.useLoaderData();

  const backlogTasks = tasks.filter(
    (task) => task.task_status.name === "Backlog"
  );
  const project = tasks.length > 0 ? tasks[0].project : null;

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const pageCount = Math.ceil(backlogTasks.length / pageSize);

  return (
    <section className="main backlog">
      <h2 className="backlog__title">Backlog for {project.title}</h2>

      {backlogTasks.length === 0 ? (
        <p>No backlog tasks found</p>
      ) : (
        <ul className="backlog__list">
          {backlogTasks.map((task) => (
            <li className="backlog__item" key={task.id}>
              {task.title}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
