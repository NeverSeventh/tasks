import { NavLink } from "react-router-dom"
import './nav.scss';




const Navbar = () => {
    return (
        <nav className="nav">
            <ul className="nav__list">
                <li className="nav__item"><NavLink to="/contacts">Contacts</NavLink></li>
                <li className="nav__item"><NavLink to="login">Login</NavLink></li>
            </ul>
            
            
        </nav>
    )
}

export default Navbar;