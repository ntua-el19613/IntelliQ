import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './components/home';
import User from './components/user';
import Quest from './components/question';
import Nquest from './components/nextquestion';
import Sum from './components/summary';
import Admin from './components/admin';
import History from './components/history';
import Showhistory from './components/showhistory';
import App from './app'
const container = document.getElementById('root');
const root = createRoot(container);

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: 'admin',
    element: <Admin />,
  },
  {
    path: 'admin/history',
    element: <History />,
  },
  {
    path: 'admin/history/:questionnaireid',
    element: <Showhistory />,
  },
  {
    path: 'user',
    element: <User />,
  },
  {
    path: 'user/question/:questionnaireid/:qid/:prevqid/:aid/:sid',
    element: <Quest />,
  },
  {
    path: 'user/nextquestion/:questionnaireid/:qid/:prevqid/:aid/:sid',
    element: <Nquest />,
  },
  {
    path: 'summary/:questionnaireid/:sid',
    element: <Sum />,
  },
]);

root.render(
  <StrictMode>
    <RouterProvider router={router} />
    <App />
  </StrictMode>
);
