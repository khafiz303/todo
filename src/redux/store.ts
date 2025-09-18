import { configureStore } from "@reduxjs/toolkit"
import { taskApi } from "@/redux/services/taskApi"
import { userApi } from "@/redux/services/userApi"
import { toDo } from "@/redux/services/toDo"
import uiReducer from '@/redux/features/toDoSlice'
import authReducer from "@/redux/features/authSlice"

export const store = configureStore({
    reducer:{
        [taskApi.reducerPath]: taskApi.reducer,
        [toDo.reducerPath]: toDo.reducer,
        [userApi.reducerPath]: userApi.reducer,

        ui: uiReducer,
        auth: authReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(taskApi.middleware, toDo.middleware, userApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch

