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
  userId: string | undefined;
}
interface PostsState {
  posts: Post[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}
export interface PostData {
  title: string;
  body: string;
  userId: string;
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

export const addNewPost = createAsyncThunk('posts/addNewPost', async (initialPost: PostData) => {
  const response = await axios.post(POSTS_URL, initialPost)
  return response.data
})

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
  // extraReducers(builder) {
  //   builder
  //     .addCase(fetchPosts.pending, (state, action) => {
  //       state.status = 'loading'
  //     })
  //     .addCase(fetchPosts.fulfilled, (state, action) => {
  //       state.status = 'succeeded'
  //       // Adding date and reactions
  //       let min = 1;
  //       const loadedPosts = action.payload.map((post: any) => {
  //         post.date = sub(new Date(), { minutes: min++ }).toISOString();
  //         post.reactions = {
  //           thumbsUp: 0,
  //           wow: 0,
  //           heart: 0,
  //           rocket: 0,
  //           eyes: 0
  //         }
  //         return post;
  //       });

  //       // Add any fetched posts to the array
  //       state.posts = state.posts.concat(loadedPosts)
  //     })
  //     .addCase(fetchPosts.rejected, (state, action) => {
  //       state.status = 'failed'
  //       state.error = action.error.message || 'Unknown error';
  //     })

  // }
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Adding date and reactions
        let min = 1;
        const loadedPosts = action.payload.map((post: any) => {
          // Check if post already exists in state
          const existingPost = state.posts.find((p) => p.id === post.id);
          if (!existingPost) {
            post.date = sub(new Date(), { minutes: min++ }).toISOString();
            post.reactions = {
              thumbsUp: 0,
              wow: 0,
              heart: 0,
              rocket: 0,
              eyes: 0,
            };
            // Use 'body' as 'content'
            post.content = post.body || 'Default content';
            return post;
          } else {
            return null;
          }
        });

        // Filter out null posts (duplicates) and add unique posts to state
        const uniqueLoadedPosts = loadedPosts.filter((post: any) => post !== null);
        state.posts = state.posts.concat(uniqueLoadedPosts);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Unknown error';
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        // Fix for API post IDs:
        // Creating sortedPosts & assigning the id 
        // would be not be needed if the fake API 
        // returned accurate new post IDs
        state.status = 'succeeded';
        const sortedPosts = state.posts.sort((a, b) => {
          if (a.id > b.id) return 1
          if (a.id < b.id) return -1
          return 0
        })
        action.payload.id = sortedPosts[sortedPosts.length - 1].id + 1;
        // End fix for fake API post IDs 

        action.payload.userId = Number(action.payload.userId)
        action.payload.date = new Date().toISOString();
        action.payload.reactions = {
          thumbsUp: 0,
          wow: 0,
          heart: 0,
          rocket: 0,
          eyes: 0
        }
        console.log(action.payload)
        state.posts.push(action.payload)
      })
  },
});
export const selectAllPosts = (state: any) => state.postThunk.posts;
export const selectPostById = (state: any, postId: string) => state.postThunk.posts.find((post: any) => post.id === postId);
export const getPostsStatus = (state: any) => state.postThunk.status;
export const getPostsError = (state: any) => state.postThunk.error;
export const { postThunkAdd, reactionPostThunkAdd } = postThunkSlice.actions;
export default postThunkSlice.reducer;