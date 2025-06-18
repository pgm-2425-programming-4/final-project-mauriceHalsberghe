import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <section className="main">
      <header className="header">
        <div className="header__row">
          <div className="breadcrumbs">
            <img className="breadcrumbs__img" src="/assets/shell32_264.ico" />
            <Link className="breadcrumbs__title" to={'/'}>Kanban</Link>
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
