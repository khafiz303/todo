import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { Task } from '@/types/task'

export const toDo = createApi({
  reducerPath: 'taskApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://172.20.10.7:3000' }),
  endpoints: (builder) => ({
    getTasks: builder.query<Task[], void>({
      query: () => 'todo',
    }),
    addTask: builder.mutation<Task, Partial<Task>>({
      query: (newTask) => ({
        url: 'todo',
        method: 'POST',
        body: newTask,
      }),
    }),
  }),
})

export const { useGetTasksQuery, useAddTaskMutation } = toDo
