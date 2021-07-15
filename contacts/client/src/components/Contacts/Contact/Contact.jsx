import { useState } from "react";
import ContactForm from "../ContactForm/ContactForm";
import './contact.scss';




const Contact = ({contact,editContact,deleteContact}) => {


    const [update,setUpdate] = useState(false);

    const updateChangeHandler =() => {
        setUpdate(true);
    }

    const updateContact = (updatedContact) => {
        
        editContact(updatedContact);
        setUpdate(false);
    }

    const deleteContactHandler = (e) => {
        deleteContact(contact.id);
    }
     
    

    return (
        <>
       {update ? <ContactForm contact={contact} submitHandler={updateContact}/> :<div  className="contact"> 
            <div className="contact__row">
            <div className="contact__name">{contact.name}</div>
            <div className="contact__number">{contact.number}</div>
            </div>

            <div className="contact__email">{contact.email}</div>
            <div className="contact__org">{contact.org}</div>
            <div className="contact__row">
            <button className="contact__btn contact__btn--edit" onClick={updateChangeHandler}>Редактировать</button>
            <button className="contact__btn contact__btn--delete" onClick={deleteContactHandler}>Удалить</button>
            </div>

        </div>}
        </>
    )
}


export default Contact;