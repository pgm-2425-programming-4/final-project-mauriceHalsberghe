import { Outlet, createRootRoute, Link } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: () => (
    <>
        <header>
            <Link to="/">Home</Link>
            <Link to="/backlog">Backlog</Link>
        </header>
        <Outlet />
    </>
  ),
})