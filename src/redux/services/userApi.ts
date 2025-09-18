import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { User } from '@/types/user'

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({baseUrl: "http://localhost:3000"}),
    tagTypes: ['Users'],
    endpoints:(builder) =>({
        getUsers: builder.query<User[], void>({
            query: () => ({
                url: '/users',
                method: 'GET'
            })
        }),
        getUserById: builder.query<User, number>({
            query: (id) => ({
                url: `/user/${id}`,
                method: 'GET'
            })
        }),
        updateUser: builder.mutation<User, Omit<User, 'id'>>({
            query: (id) => ({
                url: `/user/${id}`,
                method: 'PUT'
            })  
        }),
        deleteUser: builder.mutation<void, number>({
            query: (id) => ({
                url: `/user/${id}`,
                method: 'DELETE'
            })
        }),
        createUser: builder.mutation<void, Partial<User>>({
            query: (body) => ({
                url: '/user',
                method: 'POST',
                body
            })
        })
    })

})

export const {
    useGetUsersQuery,
    useGetUserByIdQuery,
    useUpdateUserMutation,
    useDeleteUserMutation,
    useCreateUserMutation
} = userApi