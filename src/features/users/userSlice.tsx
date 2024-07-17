import {createSlice, PayloadAction,nanoid,createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
const USERS_URL = 'https://jsonplaceholder.typicode.com/users';
interface User {    
    id: string;
    name: string;
    username: string;
}

// const initialState = [{
//     "id": "1",
//     "name": "Leanne Graham",
//     "username": "Bret"
//   }, {
//     "id": "2",
//     "name": "Ervin Howell",
//     "username": "Antonette"
//   }, {
//     "id": "3",
//     "name": "Clementine Bauch",
//     "username": "Samantha"
//   }, {
//     "id": "4",
//     "name": "Patricia Lebsack",
//     "username": "Karianne"
//   }, {
//     "id": "5",
//     "name": "Chelsey Dietrich",
//     "username": "Kamren"}];


//use above state as intial state for static users
const initialState: User[] = [];

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await axios.get(USERS_URL);
  return response.data
})

const userSlice = createSlice({
    name: "user",       
    initialState: initialState,
    reducers: { 
      userAdd:{
        reducer: (state, action: PayloadAction<User>) => {
          state.push(action.payload);
        },
        prepare: (name: string, username: string) => {
          return {
            payload: {
              id: nanoid(),
              name,
              username
            }
          }
        }
      }
    },
    extraReducers(builder) {
      builder.addCase(fetchUsers.fulfilled, (state, action) => {
          return action.payload;
      })
  }
});


export const selectAllUser = (state: any) => state.users;
export const selectUserById = (state: any, userId: any) => state.users.find((user: any) => user.id === userId);
export const {userAdd} = userSlice.actions;
export default userSlice.reducer;