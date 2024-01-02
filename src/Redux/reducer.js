import { SAVE_USER_INFO } from "./Constant"

const initialState = {
   data:{}
};
export const userInfo = (state = initialState, action) => {
    switch (action.type) {
        case SAVE_USER_INFO:
            return {
                ...state,
                data:action.payload
            };
        default:
            return state;

    }
}