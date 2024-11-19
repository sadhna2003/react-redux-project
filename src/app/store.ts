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
// import { configureStore } from "@reduxjs/toolkit";
// import { apiSlice } from "../features/api/apiSlice"; // Update the path if necessary

// const store = configureStore({
//     reducer: {
//         // Add the RTK Query API reducer
//         [apiSlice.reducerPath]: apiSlice.reducer,
//     },
//     // Add the RTK Query middleware
//     middleware: (getDefaultMiddleware) =>
//         getDefaultMiddleware().concat(apiSlice.middleware),
// });

// export default store;
