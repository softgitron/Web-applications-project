import {
    AUTHENTICATE,
    CHECK_COOKIE,
    AUTHENTICATION_SUCCESS,
    AUTHENTICATION_FAILURE,
    LOG_OUT,
    LOG_OUT_SUCCESS,
    LOG_OUT_FAILURE
} from "../actions/user";

import { PAGE_CHANGE } from "../actions/user";

import { cleanString } from "../misc/cleaner";
import errorParser from "../misc/errorParser";

const initialState = {
    isFetching: false,
    user: { userId: -1, email: "", nickname: "" },
    message: "",
    authenticationState: LOG_OUT_SUCCESS
};

export function userReducer(state = initialState, action) {
    switch (action.type) {
        case AUTHENTICATE:
            return Object.assign({}, state, {
                isFetching: true
            });

        case CHECK_COOKIE:
            return Object.assign({}, state, {
                authenticationState: CHECK_COOKIE
            });

        case AUTHENTICATION_SUCCESS:
            let newUser = action.payload.results;
            newUser.nickname = cleanString(newUser.nickname);
            return Object.assign({}, state, {
                isFetching: false,
                user: newUser,
                message: "",
                authenticationState: AUTHENTICATION_SUCCESS
            });

        case AUTHENTICATION_FAILURE:
            let newMessage = errorParser(action.payload);
            return Object.assign({}, state, {
                isFetching: false,
                message: newMessage,
                authenticationState: AUTHENTICATION_FAILURE
            });
        case LOG_OUT:
            return Object.assign({}, state, {
                isFetching: true
            });

        case LOG_OUT_SUCCESS:
            return Object.assign({}, state, initialState);

        case LOG_OUT_FAILURE:
            return Object.assign({}, state, initialState);
        /*             return Object.assign({}, state, {
                isFetching: false,
                message: action.payload.message.errors,
                authenticationState: AUTHENTICATION_FAILURE
            }); */

        case PAGE_CHANGE:
            return Object.assign({}, state, {
                message: ""
            });

        default:
            return state;
    }
}
