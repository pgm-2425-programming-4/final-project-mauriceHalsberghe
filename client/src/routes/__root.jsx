import { Outlet, createRootRoute, Link } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: () => (
    <>
        <div>
            <Link to="/">Home</Link>
            <Link to="/backlog">Backlog</Link>
        </div>
        <Outlet />
    </>
  ),
})