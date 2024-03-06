import React,{useState, useEffect, lazy, Suspense, Loader, Provider} from 'react';
import axios from "axios"
import {useNavigate, Link} from 'react-router-dom';
// import {createBrowserRouter, RouterProvider, Route, Link } from "react-router-dom";

import './User.css';

const UserList = () => {
  const jwt = sessionStorage.getItem('JWT'),
        navigate = useNavigate(),
        [users, setUsers] = useState([]);
        useEffect(() => {
          fetchData();
        }, []);
        async function fetchData() {
          axios.get('http://localhost:8000/user/list', { headers: {"Authorization" : `Bearer ${jwt}`} }).then( res => {
            if (res.data.auth === false) {
              return navigate('/login')
            }
            setUsers(res.data.users);

        }).catch(
            err => console.log(err)
        );
        }
        
  
  return (
    <div class="container-user">
      <h1 class="heading">All User</h1>
      <div class="user-list">
        <a class="create-user-button" ><Link to="/user/form">Create User</Link></a>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => {
                return (
                <tr>
                    <td>{user.user_id}</td>
                    <td>{user.user_name}</td>
                    <td><a class="view-user" href='/user/detail/id/${user.user_id}'>{user.user_email}</a></td>
                    <td><a href="/user/detail/id/<%- user.user_id %>" class="edit">✎Edit</a><a href="/user/delete/" onclick="deleteMe(event,<%- user.user_id %>)" class="del">Delete</a></td>
                </tr>
                );
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default UserList