import { Outlet, createRootRoute, Link } from '@tanstack/react-router'
import { fetchProjects } from "../queries/fetch-projects";
import { useQuery } from "@tanstack/react-query";

export const Route = createRootRoute({
  component: Navigation,

})

function Navigation() {
    const { data, isLoading, error } = useQuery({
      queryKey: ["users"],
      queryFn: fetchProjects,
    });

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
  return (
    <>
        <nav className='aside'>
            <Link className='aside__link' to="/">Home</Link>
            <p className='aside__subtitle'>Projects</p>
              <ul className="aside__list">
              {data.map((project) => (
                <li className="aside__item" key={project.id}>
                  <Link to={`/projects/${project.documentId}`} className='aside__link'>
                    {project.title}
                  </Link>
                </li>
              ))}
            </ul>
            <p className='aside__subtitle'>Info</p>
            <Link className='aside__link' to="/about">About</Link>
        </nav>
        <Outlet/>
    </>
  )
}