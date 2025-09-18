import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type { User } from '@/types/user'

interface AuthInitialState {
    user: User,
    isLoggedIn: boolean,
    loading: boolean,
}

const initialState: AuthInitialState = {
    user: JSON.parse(localStorage.getItem('user') ?? ''),
    isLoggedIn: false,
    loading: true
}


export const authSlice = createSlice({
    name : 'auth',
    initialState,
    reducers:{
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        login(state, action: PayloadAction<any>){
            localStorage.setItem('user', JSON.stringify(action.payload))
            state.user = action.payload;
            state.isLoggedIn = true;
        }

    }
})

export default authSlice.reducer

export const { login } = authSlice.actions