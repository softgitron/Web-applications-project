import {
    SIGN_IN,
    SIGN_IN_SUCCESS,
    SIGN_UP,
    SIGN_IN_FAILURE,
    LOG_OUT,
    LOG_OUT_SUCCESS,
    LOG_OUT_FAILURE
} from "../actions/user";

const BASE_LOCATION = window.location.protocol + "//" + window.location.hostname + ":4040";

export function signIn(credentials) {
    return dispatch => {
        dispatch(signInRequest());
        const route = BASE_LOCATION + "/users/authenticate";
        return fetch(route, {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials),
            credentials: "include"
        })
            .then(res => {
                // console.log(res.body);
                if (res.ok) {
                    return res.json().then(res => dispatch(signInSuccess(res)));
                } else {
                    return res.json().then(res => dispatch(signInFailure(res)));
                }
            })
            .catch(err => dispatch(signInFailure(err)));
    };
}

export function signUp(credentials) {
    return dispatch => {
        dispatch(signUpRequest());
        const route = BASE_LOCATION + "/users/createNewUser";
        return fetch(route, {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials),
            credentials: "include"
        })
            .then(res => {
                // console.log(res.body);
                if (res.ok) {
                    return res.json().then(res => dispatch(signInSuccess(res)));
                } else {
                    return res.json().then(res => dispatch(signInFailure(res)));
                }
            })
            .catch(err => dispatch(signInFailure(err)));
    };
}

export function signInRequest() {
    return {
        type: SIGN_IN
    };
}

export function signUpRequest() {
    return {
        type: SIGN_UP
    };
}

export function signInSuccess(results) {
    return {
        type: SIGN_IN_SUCCESS,
        payload: {
            results
        }
    };
}

export function signInFailure(message) {
    return {
        type: SIGN_IN_FAILURE,
        payload: {
            message
        }
    };
}

export function logOut() {
    return dispatch => {
        dispatch(signInRequest());
        const route = BASE_LOCATION + "/users/logout";
        return fetch(route, {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({}),
            credentials: "include"
        })
            .then(res => {
                // console.log(res.body);
                if (res.ok) {
                    return res.json().then(res => dispatch(logOutSuccess(res)));
                } else {
                    return res.json().then(res => dispatch(logOutFailure(res)));
                }
            })
            .catch(err => dispatch(logOutFailure(err)));
    };
}

export function logOutRequest() {
    return {
        type: LOG_OUT
    };
}

export function logOutSuccess(results) {
    return {
        type: LOG_OUT_SUCCESS,
        payload: {
            results
        }
    };
}

export function logOutFailure(message) {
    return {
        type: LOG_OUT_FAILURE,
        payload: {
            message
        }
    };
}
