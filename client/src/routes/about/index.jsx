import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/about/")({
  component: About,
});

function About() {
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
              About
            </Link>
          </div>
        </div>
      </header>

      <div className="main__content main__content--note">
        <div className="modal__card modal__card--note">
          <div className="modal__header">
            <h2 className="modal__title">
              <img src="../assets/notepad_2.ico" />
              aboutMe.txt - Notepad
            </h2>
            <div className="header__button">
              <button className="button button--close"></button>
            </div>
          </div>

          <div className="modal__content modal__content--note">
            <div className="note__header">
              <p>
                <span>F</span>ile
              </p>
              <p>
                <span>E</span>dit
              </p>
              <p>
                F<span>o</span>rmat
              </p>
              <p>
                <span>V</span>iew
              </p>
              <p>
                <span>H</span>elp
              </p>
            </div>
            <h1>About This Project</h1>
            <p className="note__text">
              This project is my introduction to building full-stack
              applications with React and Strapi.
            </p>
            <p className="note__text">
              Feel free to check out more of my work or connect with me on these
              platforms:
            </p>
            <a className="note__link" target="_blank" href="https://github.com/mauriceHalsberghe">-&gt; GitHub</a><br/>
            <a className="note__link" target="_blank" href="https://www.linkedin.com/in/maurice-halsberghe">-&gt; LinkedIn</a>
          </div>
        </div>
      </div>
    </section>
  );
}
