import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import postReducer from "../features/post/postSlice";
import userReducer from "../features/users/userSlice";
import postThunkReducer from "../features/postWithThunks/postThunkSlice";
export const store = configureStore({
    reducer: {
        counter: counterReducer,
        posts: postReducer,
        users: userReducer,
        postThunk: postThunkReducer,
    },
});
