import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAddContact, fetchContacts, fetchDeleteContact, fetchEditContact, fetchSearchContacts } from "../../redux/AC/contacts";
import { redirectActionCreator } from "../../redux/AC/redirect";
import Contact from "./Contact/Contact";
import ContactForm from "./ContactForm/ContactForm";
import ContactsSearch from "./ContactsSearch/ContactsSearch";
import './contacts.scss'
import AllContacts from "./AllContacts/AllContacts";
import Loader from "../Loader/Loader";



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
        

        

    },[user]);

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




    const contactsElements = contacts?.map(el=> {
        return <li key={el.id} > <Contact contact={el} deleteContact={deleteContactHandler} editContact={editContactHandler}   /></li>
    })

    const cancelAdd = () => {
        setAdd(false);
    }
    


    return (
        <div className="contacts">
            <h1>Контакты</h1>
            {add ? <ContactForm contact={{}} cancelHandler={cancelAdd} submitHandler={addContactHandler}/> : <button onClick={()=>setAdd(true)} className="contacts__add">Добавить контакт</button>}
            
            <div className="contacts__container">
                <ul className="contacts__list">
                    <Loader Component={AllContacts} allContacts={contactsElements} />
                    
                </ul> 
            </div>
        </div>
    )
}



export default Contacts;