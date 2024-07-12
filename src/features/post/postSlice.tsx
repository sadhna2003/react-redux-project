import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { nanoid } from "@reduxjs/toolkit";
import { sub } from 'date-fns';
interface Post {
  id: string;
  title: string;
  content: string;
  date: string;
  reactions:{
    thumbsUp: number;
    wow: number;
    heart: number;
    rocket: number;
    eyes: number;
  }
}

const intialState = [{
    "id": "1",
    "title": "Storyville",
    "content": "Nondisplaced comminuted fracture of shaft of unspecified fibula, subsequent encounter for closed fracture with routine healing",
    "date" : sub(new Date(), { minutes: 30 }).toISOString(),
    "reactions": { thumbsUp: 0, wow: 0, heart: 0, rocket: 0, eyes: 0 },
  }, {
    "id": "2",
    "title": "Animatrix, The",
    "content": "Underdosing of barbiturates, sequela",
    "date" : sub(new Date(), { minutes: 25 }).toISOString(),
    "reactions": { thumbsUp: 0, wow: 0, heart: 0, rocket: 0, eyes: 0 },
  }, {
    "id": "3",
    "title": "Cocoon",
    "content": "Other injury of extensor muscle, fascia and tendon of left little finger at wrist and hand level, initial encounter",
    "date" : sub(new Date(), { minutes: 20 }).toISOString(),
    "reactions": { thumbsUp: 0, wow: 0, heart: 0, rocket: 0, eyes: 0 },
  }, {
    "id": "4",
    "title": "Honey (Miele)",
    "content": "Unspecified foreign body in larynx causing other injury, sequela",
    "date" : sub(new Date(), { minutes: 15 }).toISOString(),
    "reactions": { thumbsUp: 0, wow: 0, heart: 0, rocket: 0, eyes: 0 },
  }, {
    "id": "5",
    "title": "Two Women (Ciociara, La)",
    "content": "Nondisplaced fracture of lunate [semilunar], left wrist, initial encounter for closed fracture",
    "date" : sub(new Date(), { minutes: 10 }).toISOString(),
    "reactions": { thumbsUp: 0, wow: 0, heart: 0, rocket: 0, eyes: 0 },
  }];

const postSlice = createSlice({
    name: "post",       
    initialState: intialState,
    reducers: { 
      postAdd:{
        reducer: (state, action: PayloadAction<Post>) => {
          state.push(action.payload);
        },
        prepare: (title: string, content: string, userId: string) => {
          return {
            payload: {
              id: nanoid(),
              title,
              content,
              date: new Date().toISOString(),
              userId,
              reactions: { thumbsUp: 0, wow: 0, heart: 0, rocket: 0, eyes: 0 },
            }
          }
        }
      },
      reactionAdd : (state, action: PayloadAction<{ postId: string; reaction: keyof Post['reactions'] }>) => {
        const { postId, reaction } = action.payload;
        const existingPost = state.find((post) => post.id === postId);
        if (existingPost) {
          existingPost.reactions[reaction]++;
        }
      }
    },
});
export const selectAllPost = (state: any) => state.posts;
export const {postAdd, reactionAdd} = postSlice.actions;
export default postSlice.reducer;