import { Outlet, createRootRoute, Link } from "@tanstack/react-router";
import { fetchProjects } from "../queries/fetch-projects";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { addProject } from "../queries/add-project";
import { useState } from "react";

export const Route = createRootRoute({
  component: Navigation,
});

function Navigation() {
  const queryClient = useQueryClient();
  const [newProjectTitle, setNewProjectTitle] = useState("");

  const { data, isLoading, error } = useQuery({
    queryKey: ["users"],
    queryFn: fetchProjects,
  });

  const mutation = useMutation({
    mutationFn: addProject,
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
      setNewProjectTitle("");
    },
  });

  const handleAddProject = () => {
    if (!newProjectTitle.trim()) return;
    mutation.mutate({ title: newProjectTitle });
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <>
      <nav className="aside">
        <Link className="aside__link" to="/">
          Home
        </Link>
        <Link className="aside__link" to="/about">
          About
        </Link>
        <ul className="aside__list">
          {data.map((project) => (
            <li className="aside__item" key={project.id}>
              <Link
                to={`/projects/${project.documentId}`}
                className="aside__link"
              >
                {project.title}
              </Link>
            </li>
          ))}
        </ul>

        <div className="aside__new-project">
          <label className="aside__label">New Project:</label>
          <input
            className="aside__input"
            id="new-project"
            value={newProjectTitle}
            onChange={(e) => setNewProjectTitle(e.target.value)}
            placeholder="Project name"
          />
          <button className="button button--aside" onClick={handleAddProject}>
            Add
          </button>
        </div>
      </nav>

      <Outlet />
    </>
  );
}
