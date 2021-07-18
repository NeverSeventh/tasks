import { ERROR } from "../types"




const errorActionCreator = (payload) => {
    return {type:ERROR, payload:payload}
}


export {errorActionCreator}