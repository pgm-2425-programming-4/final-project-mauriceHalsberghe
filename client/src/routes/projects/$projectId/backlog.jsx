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
  const [pageSize, setPageSize] = useState(10);
  const pageCount = Math.ceil(backlogTasks.length / pageSize);

  const paginatedTasks = backlogTasks.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <section className="main backlog">
      <h2 className="backlog__title">Backlog for {project.title}</h2>

      {paginatedTasks.length === 0 ? (
        <p>No backlog tasks found</p>
      ) : (
        <>
        <ul className="backlog__list">
          {paginatedTasks.map((task) => (
            <li className="backlog__item" key={task.id}>
              {task.title}
            </li>
          ))}
        </ul>

        <Pagination 
          currentPage={currentPage} 
          pageSize={pageSize} 
          onPageChanged={(page) => setCurrentPage(page)} 
          pageCount={pageCount}
          onPageSizeChanged={(size) => {setPageSize(size); setCurrentPage(1);}} />
        </>
      )}
    </section>
  );
}
