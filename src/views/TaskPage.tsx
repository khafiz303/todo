import { Button } from '@mui/material'
import { useGetTasksQuery, useAddTaskMutation } from '@/redux/services/toDo'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { openAddTaskModal, closeAddTaskModal } from '@/redux/features/toDoSlice'

export const TaskPage = () => {
  const dispatch = useAppDispatch()
  const { isAddTaskModalOpen } = useAppSelector((state) => state.ui)

  const { data: tasks, isLoading } = useGetTasksQuery()
  const [addTask] = useAddTaskMutation()

  if (isLoading) return <p>Loading...</p>

  return (
    <div>
      <Button onClick={() => dispatch(openAddTaskModal())}>Добавить задачу</Button>

      {isAddTaskModalOpen && (
        <div>
          <h3>Новая задача</h3>
          <Button
            onClick={async () => {
              await addTask({ title: 'Новая задача', completed: false })
              dispatch(closeAddTaskModal())
            }}
          >
            Сохранить
          </Button>
        </div>
      )}

      <ul>
        {tasks?.map((t) => (
          <li key={t.id}>{t.title}</li>
        ))}
      </ul>
    </div>
  )
}
