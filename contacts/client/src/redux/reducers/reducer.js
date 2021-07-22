import { ADD_CONTACT, CONTACTS, DELETE_CONTACT, EDIT_CONTACT, ERROR, LOADING, LOGIN, LOGOUT, REDIRECT, USER } from "../types";







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
        
        //User
            case USER:
                return {
                    ...state,
                    user:action.payload
                }

        //

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
                    if (el.id === action.payload?.id) {
                        for (let key in action.payload) {
                            if (key !== 'id') el[key] = action.payload[key];
                            
                        }
                    };
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

        //---------------------------

        //Loading

        case LOADING: 
            return {
                ...state,
                loading:action.payload
            }

        default:
            return state;
    }
}


export default reducer;