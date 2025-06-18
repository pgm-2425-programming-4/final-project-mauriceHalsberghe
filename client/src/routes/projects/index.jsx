import { createFileRoute, Link } from '@tanstack/react-router'
// import { fetchProjects } from "../../queries/fetch-projects";


export const Route = createFileRoute('/projects/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <section className="main">
      <header className="header">
        <div className="header__row">
          <div className="breadcrumbs">
            <img className="breadcrumbs__img" src="/assets/shell32_264.ico" />
            <Link className="breadcrumbs__title" to={'/'}>Kanban</Link>
            <Link className="breadcrumbs__title" to={'./'}>Projects</Link>
          </div>
        </div>
      </header>
      <div className='main__content'>

      </div>
      <p>
        Welcome to my Kanban app! Please select an item from the navigation
        menu.
      </p>
    </section>
  );
}
