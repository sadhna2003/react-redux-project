import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { store } from './app/store';
// import store  from './app/store';
import { Provider } from 'react-redux';
import { fetchUsers } from './features/users/userSlice';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApiProvider } from '@reduxjs/toolkit/query/react';
import { apiSlice } from './features/api/apiSlice';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

store.dispatch(fetchUsers());
root.render(
  <React.StrictMode>
    <Provider store={store}>
    {/* <App /> //uncommented this when you dont want to use router */}
    <Router>
      <Routes>
        <Route path='/*' element={<App />} />
      </Routes>
    </Router>
    </Provider>
    {/* uncomment below and comment above code to see to do list */}
    {/* <ApiProvider api={apiSlice}>
      <App />
    </ApiProvider> */} 
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
