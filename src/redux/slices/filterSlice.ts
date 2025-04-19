import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CategoriesState {
  value: number;
}

const initialState = "";

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setFilter: (_, action: PayloadAction<string>) => {
      return action.payload;
    },
  },
});

export const { setFilter } = filterSlice.actions;

export default filterSlice.reducer;
