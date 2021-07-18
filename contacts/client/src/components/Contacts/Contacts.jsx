import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAddContact, fetchContacts, fetchDeleteContact, fetchEditContact, fetchSearchContacts } from "../../redux/AC/contacts";
import { redirectActionCreator } from "../../redux/AC/redirect";
import Contact from "./Contact/Contact";
import ContactForm from "./ContactForm/ContactForm";
import ContactsSearch from "./ContactsSearch/ContactsSearch";
import './contacts.scss'



const Contacts = () => {

    const user = useSelector(state=>state.user);
    const dispatch = useDispatch();
    const contacts = useSelector(state=>state.contacts);
    const [add,setAdd] = useState(false);
    
    useEffect(()=> {
        if (!localStorage.getItem('token')) {
            dispatch(redirectActionCreator('/login'));
        }else {
            dispatch(fetchContacts());
        }
        

        

    },[]);

    const addContactHandler = (newContact) => {
        setAdd(false);
        dispatch(fetchAddContact(newContact));
    }

    const editContactHandler = (contact) => {

        dispatch(fetchEditContact(contact))

    }

    const deleteContactHandler = (id) => {
        dispatch(fetchDeleteContact(id));
    }

    const searchContactHandler = (value) => {
        dispatch(fetchSearchContacts(value));
    }


    const contactsElements = contacts?.map(el=> {
        return <li key={el.id} > <Contact contact={el} deleteContact={deleteContactHandler} editContact={editContactHandler}   /></li>
    })


    


    return (
        <div className="contacts">
            <h1>Контакты</h1>
            <div className="contacts__search">
               <ContactsSearch searchContact={searchContactHandler}/>
            </div>
            {add ? <ContactForm contact={{}} submitHandler={addContactHandler}/> : <button onClick={()=>setAdd(true)} className="contacts__add">Добавить контакт</button>}
            
            <div className="contacts__container">
                <ul className="contacts__list">
                    {contactsElements}
                </ul> 
            </div>
        </div>
    )
}



export default Contacts;