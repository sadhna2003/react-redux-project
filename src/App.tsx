import React from 'react';
import logo from './logo.svg';
// import './App.css';
import Counter from './features/counter/counter';
import Post from './features/post/post';
import AddPostForm from './features/post/addPostForm';
function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      {/* <h1 className='text-7xl text-red-500 w-full text-center'>Hello World</h1>
      <Counter /> */}
      <AddPostForm/>
      <Post/>
    </div>
  );
}

export default App;
