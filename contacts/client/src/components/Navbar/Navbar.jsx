import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom"
import { logout } from "../../redux/AC/login";
import './nav.scss';




const Navbar = ({user}) => {
    const dispatch = useDispatch();

    

    return (
        <nav className="nav">
            <ul className="nav__list">
                <li className="nav__item"><NavLink to="/contacts">Contacts</NavLink></li>
                {user 
                ? 
                <li className="nav__item"><button onClick={()=>dispatch(logout())} className='logout__btn'>logout</button></li>
                :
                <>
                <li className="nav__item"><NavLink to="/login">Login</NavLink></li>
                <li className="nav__item"><NavLink to="/signup">Signup</NavLink></li>
                </>
                }

                
            </ul>
            
            
        </nav>
    )
}

export default Navbar;