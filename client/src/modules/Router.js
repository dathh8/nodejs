import React,{useState, useEffect, lazy, Suspense, Loader, Provider} from 'react';
import ReactDOM from "react-dom/client";
import {createBrowserRouter, RouterProvider, Route, Link, useRoutes } from "react-router-dom";
// import { connect } from 'react-redux'
// import { fetchData } from '../actions/LoginActions/'
const Login = React.lazy(() => import('../components/Login/Login'));
const UserList = React.lazy(() => import('../components/User/List'));
const UserForm = React.lazy(() => import('../components/User/Form'));
const Index = React.lazy(() => import('../components/HomePage/Index'));
// import Login from '../components/Login/Login';
// import UserList from '../components/User/List';
// import UserForm from '../components/User/Form';
// import Index from '../components/HomePage/Index';

const Router = createBrowserRouter([
    { path: "/login", element:<Login/>},
    {
      path: "/", element: <Index />,
      children: [
        {
          path: "user",
          element: <UserList />
        },
        {
          path: "user/form",
          element: <UserForm />
        },
        // {
        //   path: "login",
        //   element: <Login />
        // },
      ],
    },
  ]);

  export default Router;
