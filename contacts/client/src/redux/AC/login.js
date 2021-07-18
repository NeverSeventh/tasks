import { LOGIN } from "../types"
import { errorActionCreator } from "./error"
import { redirectActionCreator } from "./redirect"






const loginActionCreator = (payload) => {
    return {type:LOGIN,payload:payload}
}



const logoutActionCreator = (payload) => {
    
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
    }
    
}



export {fetchLogin}