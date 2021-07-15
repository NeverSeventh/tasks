import { useState } from "react";
import "./contactsearch.scss";





const ContactsSearch = ({searchContact}) => {
    
    const [value,setValue] = useState('');

    const submitHandler = (e) => {
        e.preventDefault();
        searchContact(value);
    }

    return (
        <form onSubmit={submitHandler} className="search__form">
            <input type="search" className="search__input" value={value} onChange={(e)=> setValue(e.target.value)} name="" id="" />
            <button type="submit" className="search__btn">Найти контакт</button>
        </form>
    )
}


export default ContactsSearch;