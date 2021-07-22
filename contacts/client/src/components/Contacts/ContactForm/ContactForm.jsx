import { useState } from "react";



const ContactForm = ({contact,submitHandler,cancelHandler}) => {
    const [name,setName] = useState(contact.name);
    const [number,setNumber] = useState(contact.number);
    const [email,setEmail] = useState(contact.email);
    const [org,setOrg] = useState(contact.org);
    

    const formHandler = (e) => {
        e.preventDefault();
        const edited={id:contact.id};
        if (name!== contact.name ) edited.name = name;
       
        if (number !== contact.number)  edited.number=number;
        if (email !== contact.email)  edited.email = email;
        if (org !== contact.org) edited.org = org;
        submitHandler(edited);
    }


    return (
        <form onSubmit={formHandler} onKeyDown={(e)=>{if(e.key==="Escape") cancelHandler()}} className="contact">
            <div className="contact__row">
            <input type="text" placeholder="Имя" value={name} onChange={(e)=>setName(e.target.value)} />
            <input type="text" placeholder="Телефон" value={number} onChange={(e)=>setNumber(e.target.value)} />
            </div>
            <input type="text" className="contact__email" placeholder="Почта" value={email} onChange={(e)=>setEmail(e.target.value)} />
            <input type="text" placeholder="Организация" value={org} onChange={(e)=>setOrg(e.target.value)} />
            <button type="submit" className="contact__btn">Принять</button>
            <button onClick={()=>cancelHandler()}  className="contact__btn contact__btn--red">Отменить</button>
        </form> 
    )
}


export default ContactForm;