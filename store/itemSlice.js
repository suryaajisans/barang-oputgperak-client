import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  listItems: []
}

export const itemSlice = createSlice({
  name: 'item',
  initialState,
  reducers: {
    updateListItems: (state, action) =>{
      state.listItems = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const {  updateListItems } = itemSlice.actions

export default itemSlice.reducer