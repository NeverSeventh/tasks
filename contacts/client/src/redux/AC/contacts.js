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
    const responce = await fetch(`http://localhost:3004/contacts?userid=${getState().user?.id}`);
    const contacts = await responce.json();
    dispatch(contactsActionCreator(contacts));
}

const fetchEditContact = ({name,number,email,org,id}) => async(dispatch,getState) => {
    const responce = await fetch(`http://localhost:3004/contacts/${id}`, {
        method:"PATCH",
        headers: {"Content-Type": "application/json"},
        body:JSON.stringify({name,number,email,org})

    })
    const status =  await responce.json();
    if (status) {
        dispatch(editContactActionCreator(status))
    }
}

const fetchDeleteContact = (id) => async(dispatch,getState)=> {
    const responce = await fetch(`http://localhost:3004/contacts/${id}`, {
        method:"DELETE",
    })
    dispatch(deleteContactActionCreator(id));
}

const fetchAddContact = ({name,number,email,org}) => async(dispatch,getState)=> {
    const responce = await fetch(`http://localhost:3004/contacts/`, {
        method:"POST",
        headers: {"Content-Type": "application/json"},
        body:JSON.stringify({userid:getState().user.id,name,number,email,org})

    }) 
    const res = await responce.json();
    dispatch(addContactActionCreator(res));
}

const fetchSearchContacts = (value) => async(dispatch,getState) => {
    const responce = await fetch(`http://localhost:3004/contacts?userid=${getState().user.id}&number_like=${value}`)
    const data = await responce.json();
    dispatch(contactsActionCreator(data));
}


export {fetchContacts,fetchEditContact,fetchDeleteContact,fetchAddContact,fetchSearchContacts};