import { ADD_CONTACT, CONTACTS, DELETE_CONTACT, EDIT_CONTACT, ERROR, LOGIN, LOGOUT, REDIRECT } from "../types";







const reducer = (state=[],action)=> {
    
    switch(action.type) {

        //AUTH

        case LOGIN:
            return {
                ...state,
                user:action.payload
            }
        case LOGOUT: 
            return {
                ...state,
                user:null
            }

        //--------------------------
        
        //CONTACTS
        case CONTACTS:
            return {
                ...state,
                contacts:action.payload
            }
        
        case ADD_CONTACT: {
            return {
                ...state,
                contacts:[...state.contacts,action.payload]
            }
        }

        case DELETE_CONTACT:{
            return {
                ...state,
                contacts:state.contacts.filter(el=>el.id!== action.payload)
            }
        }
        case EDIT_CONTACT: {
            return {
                ...state,
                contacts:state.contacts.map(el=>{
                    if (el.id === action.payload?.id) return action.payload;
                    return el
                })
            }
        }

        
        //-----------------------------------------------------------------

        //REDIRECT
        case REDIRECT: {
            return {
                ...state,
                redirect:action.payload
            }
        }


        //------------------------
        
        //ERROR

        case ERROR: {
            return {
                ...state,
                error:action.payload
            }
        }


        default:
            return state;
    }
}


export default reducer;