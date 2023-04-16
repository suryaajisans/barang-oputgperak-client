import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  listPieceItems: []
}

export const pieceItemSlice = createSlice({
  name: 'pieceItem',
  initialState,
  reducers: {
    updateListPieceItems: (state, action) =>{
      state.listPieceItems = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const {  updateListPieceItems } = pieceItemSlice.actions

export default pieceItemSlice.reducer