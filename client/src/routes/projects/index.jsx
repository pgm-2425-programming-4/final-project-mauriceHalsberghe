import { Outlet, createFileRoute, Link } from '@tanstack/react-router'
import React from "react";
import { fetchProjects } from "../../queries/fetch-projects";
import { useQuery } from "@tanstack/react-query";

export const Route = createFileRoute("/projects/")({
  component: RouteComponent,
});

function RouteComponent() {
    const { data, isLoading, error } = useQuery({
    queryKey: ["users"],
    queryFn: fetchProjects,
  });
  

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
    
  return (
    <section className="main">
      <header className="header">
        <div className="header__row">
          <div className="breadcrumbs">
            <img className="breadcrumbs__img" src="/assets/shell32_264.ico" />
            <Link className="breadcrumbs__title" to={"/"}>
              Kanban
            </Link>
            <Link className="breadcrumbs__title" to={"./"}>
              Projects
            </Link>
          </div>
        </div>
      </header>
        <div className="main__content main__content--note">
          <div className="modal__card modal__card--note">
            <div className="modal__header">
              <h2 className="modal__title">
                <img src="../assets/notepad_2.ico" />
                projectSelect.txt - Notepad
              </h2>
              <div className="header__button">
                <button className="button button--close"></button>
              </div>
            </div>

            <div className="modal__content modal__content--note">
              <div className="note__header">
                <p><span>F</span>ile</p>
                <p><span>E</span>dit</p>
                <p>F<span>o</span>rmat</p>
                <p><span>V</span>iew</p>
                <p><span>H</span>elp</p>
              </div>
              <h1>Please select a Project:</h1>
              {data.map(project => (
                <React.Fragment key={project.id}>
                  <Link className='note__link' to={project.documentId}>
                    -&gt; {project.title}
                  </Link>
                  <br />
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

    </section>
  );
}
