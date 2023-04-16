import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  listItemsOut: []
}

export const itemOutSlice = createSlice({
  name: 'itemOut',
  initialState,
  reducers: {
    updateListItemsOut: (state, action) =>{
      state.listItemsOut = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const {  updateListItemsOut } = itemOutSlice.actions

export default itemOutSlice.reducer