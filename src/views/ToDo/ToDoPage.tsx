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
    const { data: tasks, error, isLoading } = useGetTasksQuery()
    const [deleteTask] = useDeleteTaskMutation()
    const [updateTask] = useUpdateTaskMutation()
    const [createTask] = useAddTaskMutation()

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
            <Typography variant='h4' mb={2}>
                Список задач
            </Typography>
            <Button
                variant='contained'
                color='primary'
                onClick={()=> setIsModalOpen(true)}
                sx={{mb:2}}

            >
                Добавить задачу
            </Button>
            {<TaskTable 
                tasks={tasks}
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