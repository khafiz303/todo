import { useRoutes } from 'react-router-dom';
import type { RouteObject } from 'react-router-dom'; // ✅ импортим тип отдельно

import { TaskPage } from '@/views/TaskPage';
import  {ToDoPage} from '@/views/ToDo/ToDoPage';
import { NotFoundPage } from '@/views/NotFoundPage';
import  SwipeableDrawer  from '@/components/SwipeableEdgeDrawer';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <ToDoPage/>,
  },
  {
    path: '/tasks',
    element: <TaskPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
    {
    path: '/bar',
    element: <SwipeableDrawer  tasks = {[]}/>,
  },
];
  
export const AppRoutes = () => {
  return useRoutes(routes);
};
