import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface UiState {
  isAddTaskModalOpen: boolean
  selectedTaskId?: number
}

const initialState: UiState = {
  isAddTaskModalOpen: false,
  selectedTaskId: undefined,
}

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    openAddTaskModal: (state) => {
      state.isAddTaskModalOpen = true
    },
    closeAddTaskModal: (state) => {
      state.isAddTaskModalOpen = false
    },
    setSelectedTaskId: (state, action: PayloadAction<number | undefined>) => {
      state.selectedTaskId = action.payload
    },
  },
})

export const { openAddTaskModal, closeAddTaskModal, setSelectedTaskId } = uiSlice.actions
export default uiSlice.reducer
