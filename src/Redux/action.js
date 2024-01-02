import { SAVE_USER_INFO } from "./Constant";

export const saveUserInfo=(user,history)=>{
    return {
        type:SAVE_USER_INFO,
        payload: user
    }
}