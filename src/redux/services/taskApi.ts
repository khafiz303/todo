import { createApi , fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { Task } from '@/types/task'

export const taskApi = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({baseUrl: "http://localhost:3000"}),
    tagTypes: ["Tasks", "Chat"],
    endpoints: (builder) => ({
        getTasks: builder.query<Task[] , void>({
            query: () => "/task",
            providesTags: ["Tasks"]
        }),
        addTask: builder.mutation<Task, Partial<Task>>({
            query: (newTask) => ({
                url: "task",
                method: "POST",
                body: newTask
            }),
            invalidatesTags: ["Tasks"]
        }),
        updateTask: builder.mutation<Task, {id: number; data: Partial<Task>}>({
            query: ({id , data}) => ({
                url: `/task/${id}`, 
                method: "PUT",
                body: data
            }),
            invalidatesTags: ["Tasks"]
        }),
        deleteTask: builder.mutation<{success: boolean , id: number}, number>({
            query: (id) => ({
                url: `/task/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Tasks"]
        }),
        getById: builder.query<Task, string>({
            query: (id) => ({
                url: `/task/${id}`,
                method: 'GET',
            }),
            providesTags: ['Tasks']
        }),
        changeStatus: builder.mutation<Task, Partial<Task>>({
            query: (body) => ({
                url: `task/status`,
                method: 'PUTCH',
                body,
            })
        }),
        storeMessage: builder.query<Task, string>({
            query: (id) => ({
                url: `/chat/${id}`,
                method: 'GET',
            }),
            providesTags: ['Chat']
        }),
    })
})


export const {
    useGetTasksQuery,
    useAddTaskMutation,
    useUpdateTaskMutation,
    useDeleteTaskMutation,
    useLazyGetByIdQuery,
    useChangeStatusMutation,
} = taskApi