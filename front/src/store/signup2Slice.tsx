import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Exp {
  exMtNm?: string;
  exDiff?: string;
}

const initialState: Exp[] = [
  {
    exMtNm: "",
    exDiff: "",
  },
];

export const signup2Slice = createSlice({
  name: "signup2",
  initialState,
  reducers: {
    addExp: (state, action: PayloadAction<Exp>) => {
      state.push(action.payload);
    },
    addDiff: (state, action: PayloadAction<Exp>) => {
      state.push(action.payload);
    },
    delExp: (state, action: PayloadAction<Exp>) => {
      // state.exMt.pop(action.payload);
    },
  },
});

export const { addExp, addDiff, delExp } = signup2Slice.actions;

export default signup2Slice.reducer;
