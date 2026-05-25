import { createFileRoute, Link } from "@tanstack/react-router";
import NotepadWindow from "../components/NotepadWindow";

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
        <NotepadWindow
          name={"hellowWorld"}
          title={"Welcome to my Kanban app!"}
          text_1={"A simple task manager designed with the classic look and feel of Windows 7."}
          text_2={"This is my very first React project, built using Strapi as the backend to manage and store tasks efficiently."}
        />
      </div>

    </section>
  );
}
