import {
    SIGN_IN,
    SIGN_UP,
    SIGN_IN_SUCCESS,
    SIGN_IN_FAILURE,
    LOG_OUT,
    LOG_OUT_SUCCESS,
    LOG_OUT_FAILURE
} from "../actions/user";

import { cleanString } from "../components/cleaner";

const initialState = {
    isFetching: false,
    user: { userId: -1, email: "", nickname: "" },
    message: "",
    state: LOG_OUT_SUCCESS
};

export function userReducer(state = initialState, action) {
    switch (action.type) {
        case SIGN_IN:
            return Object.assign({}, state, {
                isFetching: true
            });

        case SIGN_UP:
            return Object.assign({}, state, {
                isFetching: true
            });

        case SIGN_IN_SUCCESS:
            let newUser = action.payload.results;
            newUser.nickname = cleanString(newUser.nickname);
            // Clean nickname
            return Object.assign({}, state, {
                isFetching: false,
                user: newUser,
                message: "",
                state: SIGN_IN_SUCCESS
            });

        case SIGN_IN_FAILURE:
            let newMessage = action.payload.message.errors;
            if (typeof newMessage === "undefined") {
                newMessage = "";
            } else if (typeof newMessage !== "string") {
                newMessage = newMessage[0].msg + " " + newMessage[0].param;
            }
            return Object.assign({}, state, {
                isFetching: false,
                message: newMessage,
                state: SIGN_IN_FAILURE
            });
        case LOG_OUT:
            return Object.assign({}, state, {
                isFetching: true
            });

        case LOG_OUT_SUCCESS:
            return Object.assign({}, state, initialState);

        case LOG_OUT_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                message: action.payload.message.errors,
                state: LOG_OUT_FAILURE
            });

        default:
            return state;
    }
}
