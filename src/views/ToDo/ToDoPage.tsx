import {useState} from 'react' //Уровни / ачивки («5 дней подряд без просроченных задач»).
import * as React from 'react'
import { useAppDispatch , useAppSelector } from '@/redux/hooks'
import { Box , Button, Typography } from '@mui/material'
// import BottomNavigation from '@mui/material/BottomNavigation'
// import BottomNavigationAction from '@mui/material/BottomNavigationAction'
// import PersonIcon from '@mui/icons-material/Person';
// import WorkIcon from '@mui/icons-material/Work';
// import SchoolIcon from '@mui/icons-material/School';
// import FolderIcon from '@mui/icons-material/Folder';
// import Paper from '@mui/material/Paper';
// import List from '@mui/material/List';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemAvatar from '@mui/material/ListItemAvatar';
// import ListItemText from '@mui/material/ListItemText';
// import Avatar from '@mui/material/Avatar';

import { useGetTasksQuery,
            useDeleteTaskMutation,
            useUpdateTaskMutation,
            useAddTaskMutation
        } from '@/redux/services/taskApi'
import { TaskTable } from './components/TaskTable'
import { Error, Loading , Empty } from '@/components/StatusPage'
import type { Task } from '@/types/task'
import { AddTaskModal } from './components/AddTaskModal'
import { closeAddTaskModal, openAddTaskModal } from '@/redux/features/toDoSlice'

export const ToDoPage = ()=> {
    const [filteredTasks , setFilteredTasks] = useState<Task[] | null>(null);

    const { data: tasks, error, isLoading } = useGetTasksQuery()
    const [deleteTask] = useDeleteTaskMutation()
    const [updateTask] = useUpdateTaskMutation()
    const [createTask] = useAddTaskMutation()

    const isModalOpen = useAppSelector(state => state.ui.isAddTaskModalOpen)
    const dispatch = useAppDispatch()
    // const [value , setValue] = useState(0)

    // const ref = React.useRef<HTMLDivElement>(null)

    // React.useEffect(() => {
    //     (ref.current as HTMLDivElement).ownerDocument.body.scrollTop = 0;
    //     setMessages(refreshMessages());
    // }, [value, setMessages]);

const filterTasks = (info: string | string[]) => {

  if (!tasks) {
    setFilteredTasks([]);
    return;
  }

  if (Array.isArray(info)) {
    const filtered = tasks.filter(task =>
      info.some(filter => {
        switch (filter) {
          case "completed":
            return task.completed;
          case "today":
            return new Date(task.notification).toDateString() === new Date().toDateString();
          case "withoutDate":
            return !task.notification;
          default:
            return task.id.toString() === filter;
        }
      })
    );

    setFilteredTasks(filtered);
    return;
  }
//   switch (info) {
//     case "completed":
//       setFilteredTasks(tasks.filter(task => task.completed));
//       break;
//     case "today":
//       setFilteredTasks(
//         tasks.filter(task => new Date(task.notification).toDateString() === new Date().toDateString())
//       );
//       break;
//     case "withoutDate":
//       setFilteredTasks(tasks.filter(task => !task.notification));
//       break;
//     default:
//       setFilteredTasks(tasks.filter(task => task.id.toString() === info));
//   }
};
    const handleDelete = async(id: number)=>{
        try{
            await deleteTask(id).unwrap()
        }catch(e){  
            console.error(e)
        }
    }
    const handleToggle = async (id : number, data: Task )=> {
        try{
            await updateTask({id, data}).unwrap()
        }catch(e){  
            console.error(e)
        }
    }
    const handleCreate = async(data :Omit<Task , 'id'>)=>{
        try {
            await createTask(data).unwrap()
        } catch (e) {
            console.error(e)
        }
    }

    const openModal = ()=> {
        dispatch(openAddTaskModal())
        
    }

    if(isLoading) return <Loading/>
    if(!tasks || tasks.length === 0 ) return <Empty addTasks={true} openModal={openModal}/>
    if(error) {
        return <Error retry={()=> window.location.reload()}/>
    }
    return(
        <Box p={2}>
            <Box mb={2}>
                <Typography variant='h4' mb={2}>
                    Список задач
                </Typography>
                <Typography variant='h5' mb={2}>
                    Всего задач на сегодня: {tasks.filter(task => new Date(task.notification).toDateString() === new Date().toDateString()).length}
                </Typography>
                <Typography variant='h5' mb={2}>
                    Завершенных задач сегодня: {tasks.filter(task => task.completed && new Date(task.notification).toDateString() === new Date().toDateString()).length}
                </Typography>

                <Button>
                    <Typography onClick={() => filterTasks('completed')}>
                        Завершенные задачи
                    </Typography>
                </Button>
                <Button>
                    <Typography onClick={() => filterTasks('today')}>
                        Задачи на сегодня
                    </Typography>
                </Button>
                <Button>
                    <Typography onClick= {() => filterTasks('withoutDate')} >
                        Задачи без срока
                    </Typography>
                </Button>
            </Box>

            
            <Button
                variant='contained'
                color='primary'
                onClick={openModal}
                sx={{mb:2}}

            >
                Добавить задачу
            </Button>
            {<TaskTable
                tasks={filteredTasks ?? tasks}
                onDelete={handleDelete}
                onToggle={handleToggle}
                
            />}
{/* 
            <BottomNavigation sx={{ width: 500 }} value={value} onChange={handleChange}>
                <BottomNavigationAction
                    label="Recents"
                    value="recents"
                    icon={<PersonIcon />}
                />
                <BottomNavigationAction
                    label="Favorites"
                    value="favorites"
                    icon={<WorkIcon />}
                />
                <BottomNavigationAction
                    label="Nearby"
                    value="nearby"
                    icon={<SchoolIcon />}
                />
                <BottomNavigationAction label="Folder" value="folder" icon={<FolderIcon />} />
            </BottomNavigation> */}

            {/* <Box sx={{ pb: 7 }} ref={ref}>
                <List>
                    {messages.map(({ primary, secondary, person }, index) => (
                    <ListItemButton key={index + person}>
                        <ListItemAvatar>
                        <Avatar alt="Profile Picture" src={person} />
                        </ListItemAvatar>
                        <ListItemText primary={primary} secondary={secondary} />
                    </ListItemButton>
                    ))}
                </List>
                <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
                    <BottomNavigation
                    showLabels
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                    >
                    <BottomNavigationAction label="Personal" icon={<PersonIcon />} />
                    <BottomNavigationAction label="Work" icon={<WorkIcon />} />
                    <BottomNavigationAction label="edu" icon={<SchoolIcon />} />
                    </BottomNavigation>
                </Paper>
            </Box> */}
            <AddTaskModal
                open={isModalOpen}
                onClose={()=> dispatch(closeAddTaskModal())}
                onSubmit={handleCreate}
            />
        </Box>
    )
}