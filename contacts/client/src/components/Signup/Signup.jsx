import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { errorActionCreator } from "../../redux/AC/error";
import { fetchLogin, fetchSignup } from "../../redux/AC/login";





const Signup = () => {
    const dispatch = useDispatch();
    const [name,setName] = useState('');
    const [password,setPassword] = useState('');
    const error = useSelector(state=>state.error)
    const onSubmitHandler = (e) => {
        e.preventDefault();
        dispatch(errorActionCreator(''));
        dispatch(fetchSignup({name,password}))
        
    }

    useEffect(()=> {
        dispatch(errorActionCreator(''));
    },[])
    
    return (
        <form className="login" onSubmit={onSubmitHandler} >
            {error ?  <div className="error">{error}</div>  :<></>}
            <label className="login__label"  >Name</label>
            <input className="login__input" value={name} onChange={(e)=>setName(e.target.value)} type="name"/>
            <label className="login__label"  >Password</label>
            <input className="login__input" value={password} onChange={(e)=>setPassword(e.target.value)} type="password" />
            <button className="login__btn" type="submit">Signup</button>
        </form>
    )
}


export default Signup;