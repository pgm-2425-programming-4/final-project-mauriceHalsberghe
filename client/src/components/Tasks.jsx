import { useQuery } from "@tanstack/react-query";
import { getTasks } from "../queries/getTasks.jsx";
import { useState } from "react";
import { Pagination } from "./Pagination.jsx";

export function Tasks({ selectedProjectId }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["tasks", currentPage, pageSize, selectedProjectId],
    queryFn: () =>
      getTasks({ page: currentPage, pageSize, projectId: selectedProjectId }),
  });

  if (isPending) return <span>Loading...</span>;
  if (isError) return <span>Error: {error.message}</span>;

  const tasks = data.data.filter(
    (task) =>
      task.project.id === selectedProjectId
  );

  const selectedProject =
    tasks[0]?.project?.title || `Project ${selectedProjectId}`;
  const pageCount = data.meta.pagination.pageCount;

  return (
    <>
      <h1>Backlog for {selectedProject}</h1>
      <table className="backlog">
        <thead>
          <tr>
            <th>Task name</th>
            <th>Task Project</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.title}</td>
              <td>{task.project.title}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination
        currentPage={currentPage}
        pageCount={pageCount}
        onPageChanged={setCurrentPage}
        pageSize={pageSize}
        onPageSizeChanged={(size) => {
          setPageSize(size);
          setCurrentPage(1);
        }}
      />
    </>
  );
}
