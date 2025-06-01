import { Outlet, createRootRoute, Link } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: () => (
    <>
      <header className='header'>
        <h1>Jammin'</h1>
        <nav className='navigation'>
            <Link to="/">Home</Link>
            <Link to="/backlog">Backlog</Link>
        </nav>
      </header>
        <Outlet />
    </>
  ),
})