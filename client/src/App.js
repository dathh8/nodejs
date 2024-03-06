import logo from './logo.svg';
import './App.css';
import * as React from "react";
import ReactDOM from "react-dom/client";
import {createBrowserRouter, RouterProvider, Route, Link } from "react-router-dom";
import  Router  from './modules/Router';
import { createStore } from 'redux';
import { Provider } from 'react-redux'
import rootReducer from './reducers/DataReducer';


export default function App() {
   // initialState
   const initialState = {}

   // Create store
   const store = createStore(rootReducer, initialState);

  return (  <Provider store={store}>
    <div class='main-app'>
    <React.Suspense fallback={<div id="loader">.</div>}>
    <RouterProvider router={ Router} />
</React.Suspense>
   
    </div>
</Provider>);
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<React.StrictMode><App /></React.StrictMode>);
