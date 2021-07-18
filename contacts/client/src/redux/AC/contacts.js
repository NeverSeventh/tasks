import { ADD_CONTACT, CONTACTS, DELETE_CONTACT, EDIT_CONTACT } from "../types"




const contactsActionCreator = (payload) => {
    return {type:CONTACTS, payload:payload}
}


const addContactActionCreator = (payload) => {
    return{type:ADD_CONTACT, payload:payload}
}


const deleteContactActionCreator = (payload) => {
    return{type:DELETE_CONTACT,payload:payload}
}


const editContactActionCreator = (payload) => {
    return{type:EDIT_CONTACT,payload:payload}
}





const fetchContacts = () => async(dispatch,getState) => {
    const responce = await fetch(`http://localhost:6970/contacts`,{
        method:'GET',
        headers:{"authorization":`${localStorage.getItem('token')}`}
    });
    if (responce.status===200) {
        const contacts = await responce.json();
        dispatch(contactsActionCreator(contacts));
    }

}

const fetchEditContact = ({id,name,number,email,org}) => async(dispatch,getState) => {

    const responce = await fetch(`http://localhost:6970/contacts/edit`, {
        method:"PATCH",
        headers: {"Content-Type": "application/json",
        "authorization":`${localStorage.getItem('token')}`
    },
        body:JSON.stringify({contactid:id,name,number,email,org})

    })
   
    if (responce.status===200) {
        const contact =  await responce.json();
        console.log(contact);
        contact.id = id;
        dispatch(editContactActionCreator(contact))
    }
}

const fetchDeleteContact = (id) => async(dispatch,getState)=> {
    const responce = await fetch(`http://localhost:6970/contacts/${id}`, {
        method:"DELETE",
        headers:{"authorization":`${localStorage.getItem('token')}`}
    })
    if (responce.status ===200) {
        dispatch(deleteContactActionCreator(id));
    }
    
}

const fetchAddContact = ({name,number,email,org}) => async(dispatch,getState)=> {
    const responce = await fetch(`http://localhost:6970/contacts/add`, {
        method:"POST",
        headers: {"Content-Type": "application/json",
                "authorization":`${localStorage.getItem('token')}`
    },
        body:JSON.stringify({name,number,email,org})

    }) 
    const res = await responce.json();
    dispatch(addContactActionCreator(res));
}

const fetchSearchContacts = (value) => async(dispatch,getState) => {
    const responce = await fetch(`http://localhost:6970/contacts`)
    const data = await responce.json();
    dispatch(contactsActionCreator(data));
}


export {fetchContacts,fetchEditContact,fetchDeleteContact,fetchAddContact,fetchSearchContacts};