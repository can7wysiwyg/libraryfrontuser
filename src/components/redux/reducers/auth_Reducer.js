import { AUTH_ERROR, AUTH_REGISTER } from "../actions/types";

export function authRdcr(state={}, action) {

    switch(action.type) {

        case AUTH_REGISTER:
            return{...state, msg: "success"}
        
        case AUTH_ERROR:
            return{...state, error: "there was a problem"}
            
        default:
            return state


    }

}