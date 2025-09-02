import React from 'react';
import { useRoutes } from 'react-router-dom';
import type { RouteObject } from 'react-router-dom'; // ✅ импортим тип отдельно

import  {ToDoPage} from '@/views/ToDo/ToDoPage';
import { NotFoundPage } from '@/views/NotFoundPage';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <ToDoPage/>,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
];

export const AppRoutes = () => {
  return useRoutes(routes);
};
