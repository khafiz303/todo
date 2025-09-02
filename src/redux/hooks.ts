import {  useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from './store'
import type { TypedUseSelectorHook}  from 'react-redux'

// 👇 хук для диспатча (с правильным типом)
export const useAppDispatch: () => AppDispatch = useDispatch

// 👇 хук для селектора (с правильным типом RootState)
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
