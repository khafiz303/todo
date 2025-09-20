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
    setModal: (state, action: PayloadAction<boolean>) => {
      state.isAddTaskModalOpen = action.payload
    },
    setSelectedTaskId: (state, action: PayloadAction<number | undefined>) => {
      state.selectedTaskId = action.payload
    },

  },
})

export const { setModal, setSelectedTaskId } = uiSlice.actions
export default uiSlice.reducer
