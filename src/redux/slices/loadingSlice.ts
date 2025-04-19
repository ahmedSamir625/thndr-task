import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'


const initialState = true

export const loadingSlice = createSlice({
    name: 'loading',
    initialState,
    reducers: {
        setIsLoading: (_, action: PayloadAction<boolean>) => {
            return action.payload;  
        },
    },
})

export const { setIsLoading } = loadingSlice.actions

export default loadingSlice.reducer