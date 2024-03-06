import axios from "axios"
import  * as types  from '../constants/ActionTypes'

export function checkLogin() {
    return {
        type: types.CHECK_LOGIN
      }
    axios.get('http://localhost:8000/login/check', { headers: {"Authorization" : `Bearer ${jwt}`} }).then( res => {
        return res.data.auth
    });
}