import {useState} from 'react'
import {scheduleNotification} from '@/helpers/notify'
import { useAppDispatch , useAppSelector } from '@/redux/hooks'
import { Box , Button, Typography } from '@mui/material'
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
            scheduleNotification(data)
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
            <AddTaskModal
                open={isModalOpen}
                onClose={()=> dispatch(closeAddTaskModal())}
                onSubmit={handleCreate}
            />
        </Box>
    )
}