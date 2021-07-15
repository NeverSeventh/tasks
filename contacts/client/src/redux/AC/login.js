import { LOGIN } from "../types"
import { redirectActionCreator } from "./redirect"






const loginActionCreator = (payload) => {
    return {type:LOGIN,payload:payload}
}



const logoutActionCreator = (payload) => {
    
}



const fetchLogin = (name,password) => async(dispatch,getState)=> {
    const responce = await fetch(`http://localhost:3004/users?name=${name}&password=${password}`)
    const [user] = await responce.json();
    if (user) {
        dispatch(loginActionCreator(user));
        dispatch(redirectActionCreator('/contacts'));
    }else {

    }
}



export {fetchLogin}