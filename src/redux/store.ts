import { configureStore } from "@reduxjs/toolkit"
import { taskApi } from "@/redux/services/taskApi"
import { toDo } from "@/redux/services/toDo"
import uiReducer from '@/redux/features/toDoSlice'

export const store = configureStore({
    reducer:{
        [taskApi.reducerPath]: taskApi.reducer,
        [toDo.reducerPath]: toDo.reducer,
        ui: uiReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(taskApi.middleware, toDo.middleware)
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch

