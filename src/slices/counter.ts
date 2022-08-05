import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",
  initialState: 0,
  reducers: {
    increase: (state: number) => {
      return state + 1;
    },
    decrease: (state: number) => {
      return state - 1;
    },
    increaseByAmount: (state: number, { payload }: PayloadAction<number>) => {
      return state + payload;
    },
  },
});

// Actions
export const { increase, decrease, increaseByAmount } = counterSlice.actions;

// Reducer
export default counterSlice.reducer;
