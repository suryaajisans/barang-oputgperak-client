import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  listTypeItems: [],
};

export const typeItemSlice = createSlice({
  name: "typeItem",
  initialState,
  reducers: {
    updateListTypeItems: (state, action) => {
      state.listTypeItems = action.payload
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateListTypeItems } = typeItemSlice.actions;

export default typeItemSlice.reducer;
