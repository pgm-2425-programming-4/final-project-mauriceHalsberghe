import { Link, createFileRoute } from "@tanstack/react-router";
import { fetchProjects } from "../queries/fetch-projects";
import { useQuery } from "@tanstack/react-query";

export const Route = createFileRoute("/")({
  component: Users,
});

function Users() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["users"],
    queryFn: fetchProjects,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  
  return (
    <div className="aside"> 
      <ul className="aside__list">
        {data.map((project) => (
          <li className="aside__item" key={project.id}>
            <Link to={`/projects/${project.id}`} className="[&.active]:font-bold">
              {project.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
