import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { nanoid } from "@reduxjs/toolkit";
import { sub } from 'date-fns';
import axios from "axios";

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';
interface Post {
  id: string;
  title: string;
  body: string;
  date: string;
  reactions: {
    thumbsUp: number;
    wow: number;
    heart: number;
    rocket: number;
    eyes: number;
  }
}
interface PostsState {
  posts: Post[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: PostsState = {
  posts: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null
};


export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await axios.get(POSTS_URL);
  return response.data;
});

const postThunkSlice = createSlice({
  name: "post",
  initialState: initialState,
  reducers: {
    postThunkAdd: {
      reducer: (state, action: PayloadAction<Post>) => {
        state.posts.push(action.payload);
      },
      prepare: (title: string, body: string, userId: string) => {
        return {
          payload: {
            id: nanoid(),
            title,
            body,
            date: new Date().toISOString(),
            userId,
            reactions: { thumbsUp: 0, wow: 0, heart: 0, rocket: 0, eyes: 0 },
          }
        }
      }
    },
    reactionPostThunkAdd: (state, action: PayloadAction<{ postId: string; reaction: keyof Post['reactions'] }>) => {
      const { postId, reaction } = action.payload;
      const existingPost = state.posts.find((post) => post.id === postId);
      if (existingPost) {
        existingPost.reactions[reaction]++;
      }
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        // Adding date and reactions
        let min = 1;
        const loadedPosts = action.payload.map((post: any) => {
          post.date = sub(new Date(), { minutes: min++ }).toISOString();
          post.reactions = {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            eyes: 0
          }
          return post;
        });

        // Add any fetched posts to the array
        state.posts = state.posts.concat(loadedPosts)
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || 'Unknown error';
      })

  }
});
export const selectAllPosts = (state: any) => state.postThunk.posts;
export const getPostsStatus = (state: any) => state.postThunk.status;
export const getPostsError = (state: any) => state.postThunk.error;
export const { postThunkAdd, reactionPostThunkAdd } = postThunkSlice.actions;
export default postThunkSlice.reducer;