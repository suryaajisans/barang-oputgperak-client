import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userDetail: null,
  token: null,
  listUsers: [],
  listHistories: []
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload
    },
    setUser: (state, action) => {
      state.userDetail = action.payload
    },
    updateListUsers: (state, action) =>{
      state.listUsers = action.payload
    },
    updateListHistories: (state, action) =>{
      state.listHistories = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setToken, setUser, updateListUsers, updateListHistories } = userSlice.actions

export default userSlice.reducer