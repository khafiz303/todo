import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface UiState {
  isAddTaskModalOpen: boolean
  selectedTaskId?: number
  form: boolean
}

const initialState: UiState = {
  isAddTaskModalOpen: false,
  selectedTaskId: undefined,
  form: false
}

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setModal: (state, action: PayloadAction<boolean>) => {
      state.isAddTaskModalOpen = action.payload
    },
    setSelectedTaskId: (state, action: PayloadAction<number | undefined>) => {
      state.selectedTaskId = action.payload
    },
    closeSelectForm: (state) => {
      state.form = false
    },
    setForm: (state, action: PayloadAction<boolean>) => {
      state.isAddTaskModalOpen = action.payload
    },
  },
})

export const { setModal, setSelectedTaskId , setForm} = uiSlice.actions
export default uiSlice.reducer
