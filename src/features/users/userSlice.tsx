import {createSlice, PayloadAction,nanoid} from "@reduxjs/toolkit";

interface User {    
    id: string;
    name: string;
    username: string;
}

const initialState = [{
    "id": "1",
    "name": "Leanne Graham",
    "username": "Bret"
  }, {
    "id": "2",
    "name": "Ervin Howell",
    "username": "Antonette"
  }, {
    "id": "3",
    "name": "Clementine Bauch",
    "username": "Samantha"
  }, {
    "id": "4",
    "name": "Patricia Lebsack",
    "username": "Karianne"
  }, {
    "id": "5",
    "name": "Chelsey Dietrich",
    "username": "Kamren"}];

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
});


export const selectAllUser = (state: any) => state.users;
export const {userAdd} = userSlice.actions;
export default userSlice.reducer;