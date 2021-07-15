import { useState } from "react";



const ContactForm = ({contact,submitHandler}) => {
    const [name,setName] = useState(contact.name || '');
    const [number,setNumber] = useState(contact.number || '');
    const [email,setEmail] = useState(contact.email || '');
    const [org,setOrg] = useState(contact.org || '');
    

    const formHandler = (e) => {
        e.preventDefault();
        contact.name = name;
        contact.number = number;
        contact.email = email;
        contact.org = org;
        submitHandler(contact);
    }


    return (
        <form onSubmit={formHandler} className="contact">
            <div className="contact__row">
            <input type="text" placeholder="Имя" value={name} onChange={(e)=>setName(e.target.value)} />
            <input type="text" placeholder="Телефон" value={number} onChange={(e)=>setNumber(e.target.value)} />
            </div>
            <input type="text" className="contact__email" placeholder="Почта" value={email} onChange={(e)=>setEmail(e.target.value)} />
            <input type="text" placeholder="Организация" value={org} onChange={(e)=>setOrg(e.target.value)} />
            <button type="submit" className="contact__btn">Принять</button>
        </form> 
    )
}


export default ContactForm;