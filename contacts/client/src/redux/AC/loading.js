import { LOADING } from "../types"










const loadingActionCreator = (payload) => {
    return {type:LOADING,payload:payload}
}




export {loadingActionCreator};