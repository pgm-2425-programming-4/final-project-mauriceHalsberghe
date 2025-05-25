import { useQuery } from "@tanstack/react-query";
import { getProjects } from "../queries/getProjects.jsx";

export function ProjectSelector({ selectedProjectId, onChange }) {
  const { data, isPending, isError } = useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
  });

  if (isPending) return <p>Loading projects...</p>;
  if (isError) return <p>Failed to load projects</p>;

  return (
    <div className="select">
      <select
        value={selectedProjectId}
        onChange={(e) => onChange(Number(e.target.value))}
      >
        {data.data.map((project) => (
          <option key={project.id} value={project.id}>
            {project.title}
          </option>
        ))}
      </select>
    </div>
  );
}
