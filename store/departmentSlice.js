import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  listDepartments: []
}

export const departmentSlice = createSlice({
  name: 'department',
  initialState,
  reducers: {
    updateListDepartments: (state, action) =>{
      state.listDepartments = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const {  updateListDepartments } = departmentSlice.actions

export default departmentSlice.reducer