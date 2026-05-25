import { createFileRoute, Link } from "@tanstack/react-router";
import NotepadWindow from "../../components/NotepadWindow";

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
        <NotepadWindow
          name={"aboutMe"}
          title={"About This Project"}
          text_1={"This project is my introduction to building full-stack applications with React and Strapi."}
          text_2={"Feel free to check out more of my work or connect with me on these platforms:"}
          link_1={{name: "GitHub", link: "https://github.com/mauriceHalsberghe"}}
          link_2={{name: "LinkedIn", link: "https://www.linkedin.com/in/maurice-halsberghe"}}
        />
      </div>
    </section>
  );
}
