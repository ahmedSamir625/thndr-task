import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IStockItem } from '../../interfaces'



const initialState = {
   stocks: [] as IStockItem[],
   filteredStocks: [] as IStockItem[],
}

export const stockSlice = createSlice({
    name: 'stocks',
    initialState,
    reducers: {
        setStocks: (state, action: PayloadAction<IStockItem[]>) => {
            return { ...state, stocks: action.payload };
        },
        setFilteredStocks: (state, action: PayloadAction<IStockItem[]>) => {
            return { ...state, filteredStocks: action.payload };
        },
    },
})

export const { setStocks, setFilteredStocks } = stockSlice.actions

export default stockSlice.reducer