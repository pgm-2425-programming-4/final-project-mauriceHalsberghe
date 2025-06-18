import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/about/')({
  component: About,
})

function About() {
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
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel minus, pariatur facilis mollitia voluptates aspernatur fuga atque consequuntur eveniet, ut quam asperiores quaerat laborum accusantium quae, recusandae ab dolor. Neque.
      <p>Maurice Halsberghe</p>
      <a href='https://www.linkedin.com/in/maurice-halsberghe/' target='_blank' >LinkedIn</a>
        </p>
      </section>
    );

}
