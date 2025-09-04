import {useState} from 'react'
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

export const ToDoPage = ()=> {
    const [isModalOpen , setIsModalOpen] = useState(false)
    const [filteredTasks , setFilteredTasks] = useState([] as Task[])

    const { data: tasks, error, isLoading } = useGetTasksQuery()
    const [deleteTask] = useDeleteTaskMutation()
    const [updateTask] = useUpdateTaskMutation()
    const [createTask] = useAddTaskMutation()

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
  switch (info) {
    case "completed":
      setFilteredTasks(tasks.filter(task => task.completed));
      break;
    case "today":
      setFilteredTasks(
        tasks.filter(task => new Date(task.notification).toDateString() === new Date().toDateString())
      );
      break;
    case "withoutDate":
      setFilteredTasks(tasks.filter(task => !task.notification));
      break;
    default:
      setFilteredTasks(tasks.filter(task => task.id.toString() === info));
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
        } catch (e) {
            console.error(e)
        }
    }

    if(isLoading) return <Loading/>
    if(!tasks || tasks.length === 0 ) return <Empty/>
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
                onClick={()=> setIsModalOpen(true)}
                sx={{mb:2}}

            >
                Добавить задачу
            </Button>
            {<TaskTable
                tasks={filteredTasks ? filteredTasks : tasks}
                onDelete={handleDelete}
                onToggle={handleToggle}
                
            />}

            <AddTaskModal
                open={isModalOpen}
                onClose={()=> setIsModalOpen(false)}
                onSubmit={handleCreate}
            />
        </Box>
    )
}