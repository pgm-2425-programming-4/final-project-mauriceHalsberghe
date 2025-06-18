import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './main.css';
import { RouterProvider, createRouter, Link } from '@tanstack/react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { routeTree } from './routeTree.gen';


const router = createRouter({
  routeTree,
  defaultNotFoundComponent: () => (
      <div className="error">
        <h1 className="error__title">404 Error</h1>
        <div className="error__content">
          <img className="error__img" src="/assets/DxpTaskSync_62.ico" />
          <p className="error__message">404 Page not found</p>
        </div>
        <Link className="button button--error" to={"/"}>
          Home
        </Link>
      </div>
    ),
});

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
)