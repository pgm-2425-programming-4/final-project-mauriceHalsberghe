import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { fetchTasks } from "../../../queries/fetch-tasks-by-projectid";
import React, { useState } from "react";
import { Pagination } from "../../../components/Pagination";
import { EditTaskModal } from "../../../components/EditTaskModal";

export const Route = createFileRoute("/projects/$projectId/backlog")({
  loader: async ({ params }) => {
    const [tasks] = await Promise.all([fetchTasks(params.projectId)]);

    if (!tasks || tasks.length === 0) {
      throw notFound();
    }

    return { tasks };
  },

  component: BacklogPage,
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

function BacklogPage() {
  const { tasks: initialTasks } = Route.useLoaderData();
  const [tasks, setTasks] = useState(initialTasks);
  const [selectedTask, setSelectedTask] = useState(null);

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

  const updateTask = (updatedTask) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === updatedTask.id ? updatedTask : t))
    );
    setSelectedTask(null);
  };

  return (
    <section className="main">
      <div className="backlog">
        <h2 className="backlog__title">Backlog for {project.title}</h2>

        <div className="backlog__content">
          <div className="backlog__header">
            <p>Name</p>
            <p>Date modified</p>
            <p>Labels</p>
          </div>
          {paginatedTasks.length === 0 ? (
            <p>No backlog tasks found</p>
          ) : (
            <>
              <ul className="backlog__list">
                {paginatedTasks.map((task) => {
                  let labelString = "";
                  task.task_labels.map((label) => {
                    labelString += label.name;
                    labelString += ", ";
                  });

                  const date = new Date(task.updatedAt);
                  const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;

                  return (
                    <li className="backlog__item" key={task.id} onClick={() => setSelectedTask(task)}>
                      <p>{task.title}</p>
                      <p>{formattedDate}</p>
                      <p>{labelString}</p>
                    </li>
                  );
                })}
              </ul>
            </>
          )}
        </div>
      </div>

      <Pagination
        currentPage={currentPage}
        pageSize={pageSize}
        onPageChanged={(page) => setCurrentPage(page)}
        pageCount={pageCount}
        onPageSizeChanged={(size) => {
          setPageSize(size);
          setCurrentPage(1);
        }}
      />

      {selectedTask && (
        <EditTaskModal
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
          onSave={updateTask}
        />
      )}
    </section>
  );
}
