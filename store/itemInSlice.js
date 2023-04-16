import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  listItemsIn: []
}

export const itemInSlice = createSlice({
  name: 'itemIn',
  initialState,
  reducers: {
    updateListItemsIn: (state, action) =>{
      state.listItemsIn = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const {  updateListItemsIn } = itemInSlice.actions

export default itemInSlice.reducer