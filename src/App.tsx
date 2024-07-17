import React from 'react';
import logo from './logo.svg';
// import './App.css';
import Counter from './features/counter/counter';
import Post from './features/post/post';
import AddPostForm from './features/post/addPostForm';
import PostThunkLists from './features/postWithThunks/postThunkLists';
import SinglePost from './features/postWithThunks/singlePost';
import { Routes, Route } from 'react-router-dom';
import Layout from './component/layout';
import EditPostForm from './features/post/editPostForm';
import UserPage from './features/users/userPage';
import UsersList from './features/users/usersList';
function App() {
  return (
    // <div className="App">
    //   {/* <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.tsx</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header> */}
    //   {/* <h1 className='text-7xl text-red-500 w-full text-center'>Hello World</h1>
    //   <Counter /> */}
    //   <AddPostForm fromThunk={true}/>
    //    {/* to understand the basic example pass thunk is false or do not passs it  and uncoment the below  post*/}
    //    {/* <AddPostForm fromThunk={false}/>
    //   <Post/> */}
    //   <PostThunkLists/>
    // </div>
    <div className=''>
    <Routes>
      <Route path="/" element={<Layout />}>

        <Route index element={<PostThunkLists />} />

        <Route path="post">
          <Route index element={<AddPostForm fromThunk={true} />} />
          <Route path=":postId" element={<SinglePost />} />
          <Route path="edit/:postId" element={<EditPostForm fromThunk={true} />} />
          {/* <Route path="addPostForm/:postId" element={<AddPostForm fromThunk={true} />} /> */}

        </Route>

        <Route path="users">
          <Route index element={<UsersList />} />
          <Route path=":userId" element={<UserPage />} />
        </Route>

      </Route>
    </Routes>
    </div>
  );
}

export default App;
