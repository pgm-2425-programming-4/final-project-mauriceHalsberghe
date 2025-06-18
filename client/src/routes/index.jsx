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
            <Link className="breadcrumbs__title" to={"/"}>
              Kanban
            </Link>
          </div>
        </div>
      </header>
      <div className="main__content main__content--note">
        <div className="modal__card modal__card--note">
          <div className="modal__header">
            <h2 className="modal__title">
              <img src="../assets/notepad_2.ico" />
              hellowWorld.txt - Notepad
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
            <h1>Welcome to my Kanban app!</h1>
            <p className="note__text">
              A simple task manager designed with the classic look and feel of
              Windows 7.
            </p>
            <p className="note__text">
              This is my very first React project, built using
            Strapi as the backend to manage and store tasks efficiently. 
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
