import React,{useState, useEffect} from 'react';
import {useNavigate, Link} from 'react-router-dom';
import axios from "axios"


const Form = () => {
    const jwt = sessionStorage.getItem('JWT'),
    navigate = useNavigate(),
    [users, setUsers] = useState([]),
    [auth, setAuth] = useState(false);;
    useEffect(() => {
      checkLogin();
    }, []);
    async function checkLogin() {
      axios.get('http://localhost:8000/login/check', { headers: {"Authorization" : `Bearer ${jwt}`} }).then( res => {
        setAuth(res.data.auth)
    }).catch(
        setAuth(false)
    );
    }
    

    return (
        <div class="container-user">
        <h1 class="heading">User</h1>
        <div class="form">
          <form action="">
            <input type="text" name="user_id" id="user_id" value="" hidden/>
            <label for="user_name">Name: <span class="error-msg title"></span></label>
            <input type="text" name="user_name" id="user_name" placeholder="Name" value=""/>
            <label for="user_email">Email: <span class="error-msg author"></span></label>
            <input type="text" name="user_email" id="user_email" placeholder="User email" value=""/>
            <label for="password">Password: <span class="error-msg author"></span></label>
            <button type="submit">Save</button>
            <a class="back-to-list-button"><Link to="/user">Back to list</Link></a>
          </form>
        </div>
      </div>
    )
}

export default Form;