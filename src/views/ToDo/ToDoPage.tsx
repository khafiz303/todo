import { useState, useMemo } from 'react'
import { scheduleNotification } from '@/helpers/notify'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { Box, Button, Typography, MenuItem, TextField } from '@mui/material'
import {
  useGetTasksQuery,
  useDeleteTaskMutation,
  useUpdateTaskMutation,
  useAddTaskMutation,
} from '@/redux/services/taskApi'
import { TaskTable } from './components/TaskTable'
import { Error, Loading, Empty } from '@/components/StatusPage'
import type { Task } from '@/types/task'
import { AddTaskModal } from './components/AddTaskModal'
import { setModal } from '@/redux/features/toDoSlice'
import { useSnackbar } from 'notistack'

export const ToDoPage = () => {
  const [filterTags, setFilterTags] = useState<string[]>([])
  const [categoryFilter, setCategoryFilter] = useState<string>('') //general 

  const { data: tasks, error, isLoading } = useGetTasksQuery()
  const [deleteTask] = useDeleteTaskMutation()
  const [updateTask] = useUpdateTaskMutation()
  const [createTask] = useAddTaskMutation()

  const { enqueueSnackbar } = useSnackbar() 

  const isModalOpen = useAppSelector((state) => state.ui.isAddTaskModalOpen)
  const dispatch = useAppDispatch()

  const applyFilters = (tasks: Task[]) => {
    const filtered =  tasks.filter((task) => {
      // --- Фильтр категории ---
      if (categoryFilter && task.categories !== categoryFilter) return false

      // --- Фильтры тегов ---
      if (filterTags.length === 0) return true

      return filterTags.some((tag) => {
        switch (tag) {
          case 'completed':
            return task.completed === true
          case 'today':
            return task.notification
              ? new Date(task.notification).toDateString() === new Date().toDateString()
              : false
          case 'withoutDate':
            return !task.notification
          default:
            return task.id.toString() === tag
        }
      })
    })

    const priorityOrder = { high: 3, medium: 2, low: 1 }

    return filtered.sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]) // b -> a возврастанию , a -> b убывания
  }

  const filteredTasks = useMemo(() => {
    if (!tasks) return []
    return applyFilters(tasks)
  }, [tasks, filterTags, categoryFilter])

  // --- CRUD ---
  const handleDelete = async (id: string) => {
    try {
      await deleteTask(id).unwrap()
      enqueueSnackbar('Deleted', {variant: 'success'})
    } catch (e) {
      console.error(e)
    }
  }

  const handleToggle = async (data: Task) => {
    try {
      await updateTask({ data }).unwrap()
    } catch (e) {
      console.error(e)
    }
  }

  const handleCreate = async (data: Omit<Task, 'id'>) => {
    try {
      await createTask(data).unwrap()
      scheduleNotification(data)
    } catch (e) {
      console.error(e)
    }
  }

  const openModal = () => dispatch(setModal(true))

  // --- UI состояния ---
  if (isLoading) return <Loading />
  if (error) return <Error retry={() => window.location.reload()} />
  if ((!tasks || tasks.length === 0) && !isModalOpen) return <Empty addTasks={true} openModal={openModal} />

  // --- Тоггл фильтров ---
  const toggleFilterTag = (tag: string) => {
    setFilterTags((prev) => (prev.includes(tag) ? prev.filter(f => f !== tag) : [...prev, tag]))
  }


  return (
    <Box p={2}>
      <Box mb={2}>
        <Typography variant='h5' mb={2}>
          Всего задач на сегодня:{' '}
          {tasks?.filter(
            (task) =>
              task.notification &&
              new Date(task.notification).toDateString() === new Date().toDateString()
          ).length}
        </Typography>
        <Typography variant='h5' mb={2}>
          Завершенных задач сегодня:{' '}
          {tasks?.filter(
            (task) =>
              task.completed &&
              task.notification &&
              new Date(task.notification).toDateString() === new Date().toDateString()
          ).length}
        </Typography>

        <Box display='flex' gap={1} flexWrap='wrap' mb={2}>
          <Button
            variant={filterTags.includes('completed') ? 'contained' : 'outlined'}
            onClick={() => toggleFilterTag('completed')}
          >
            Завершенные задачи
          </Button>

          <Button
            variant={filterTags.includes('today') ? 'contained' : 'outlined'}
            onClick={() => toggleFilterTag('today')}
          >
            Задачи на сегодня
          </Button>

          <Button
            variant={filterTags.includes('withoutDate') ? 'contained' : 'outlined'}
            onClick={() => toggleFilterTag('withoutDate')}
          >
            Задачи без срока
          </Button>

          <TextField
            select
            label='Приоритет'
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            size='small'
          >
            <MenuItem value=''>Все</MenuItem>
            <MenuItem value='general'>Общий</MenuItem>
            <MenuItem value='edu'>Образование(саморазвитие)</MenuItem>
            <MenuItem value='job'>Работа</MenuItem>
            <MenuItem value='personal'>Личное</MenuItem>
          </TextField>
        </Box>
      </Box>

      <AddTaskModal open={isModalOpen} onClose={() => dispatch(setModal(false))} onSubmit={handleCreate} />

      <Button variant='contained' color='primary' onClick={openModal} sx={{ mb: 2 }}>
        Добавить задачу
      </Button>

      <TaskTable tasks={filteredTasks} onDelete={handleDelete} onToggle={handleToggle} />
    </Box>
  )
}
