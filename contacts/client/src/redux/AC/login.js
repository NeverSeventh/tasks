import { LOGIN, LOGOUT, USER } from "../types"
import { contactsActionCreator } from "./contacts"
import { errorActionCreator } from "./error"
import { redirectActionCreator } from "./redirect"






const loginActionCreator = (payload) => {
    return {type:LOGIN,payload:payload}
}



const logoutActionCreator = () => {
    return {type:LOGOUT}
}

const userActionCreator = (payload) => {
    return {type:USER, payload:payload}
}

const logout = () =>(dispatch)=> {
    localStorage.removeItem('token');
    dispatch(logoutActionCreator())
    dispatch(contactsActionCreator([]))
}

const fetchLogin = (name,password) => async(dispatch,getState)=> {
    const responce = await fetch(`http://localhost:6970/users/login`,{
        method:"POST",
        headers:{"Content-type":"application/json"},
        body:JSON.stringify({name,password})
        
        
    })

    if (responce.status === 200) {
        const user = await responce.json();
        localStorage.setItem('token',user.token);
        dispatch(loginActionCreator({name:user.name,id:user.id}));
        dispatch(redirectActionCreator('/contacts'));
    }else {
        const err = await responce.json()
        
        dispatch(errorActionCreator(err));

    }


    
    
}


const fetchUser = () => async(dispatch,getState) => {
    const responce = await fetch(`http://localhost:6970/users/`,{
        method:'GET',
        headers:{"authorization":`${localStorage.getItem('token')}`}
    });
    if (responce.status === 200) {
        const user= await responce.json();
        dispatch(userActionCreator(user));
    }
    else if (responce.status ===401) {
        localStorage.removeItem('token');
        dispatch(logoutActionCreator());
        dispatch(contactsActionCreator([]));
    }

}

const fetchSignup=({name,password})=> async(dispatch,getState)=> {
    const responce = await fetch(`http://localhost:6970/users/signup`,{
        method:"POST",
        headers:{"Content-type":"application/json"},
        body:JSON.stringify({name,password})
        
        
    })

    if (responce.status === 200) {
        const user = await responce.json();
        localStorage.setItem('token',user.token);
        dispatch(loginActionCreator({name:user.name,id:user.id}));
        dispatch(redirectActionCreator('/contacts'));
    } else {
        const err = await responce.json()
        
        dispatch(errorActionCreator(err));

    }
}


export {fetchLogin,fetchSignup,logout, fetchUser}