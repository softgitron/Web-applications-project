import {
    AUTHENTICATE,
    CHECK_COOKIE,
    AUTHENTICATION_SUCCESS,
    AUTHENTICATION_FAILURE,
    LOG_OUT,
    LOG_OUT_SUCCESS,
    LOG_OUT_FAILURE,
    PAGE_CHANGE
} from "../actions/user";

const BASE_LOCATION = window.location.protocol + "//" + window.location.hostname + ":4040";

export function authenticate(credentials) {
    return dispatch => {
        dispatch(authenticationRequest());
        let route;
        if (credentials.nickname === undefined) {
            // SignIn
            route = BASE_LOCATION + "/users/authenticate";
        } else {
            // SignUp
            route = BASE_LOCATION + "/users/createNewUser";
            if (credentials.password !== credentials.passwordAgain) {
                return dispatch(authenticationFailure({ errors: "Passwords don't match" }));
            }
        }
        return fetch(route, {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials),
            credentials: "include"
        })
            .then(res => {
                // console.log(res.body);
                if (res.ok) {
                    return res.json().then(res => {
                        document.cookie = JSON.stringify(res);
                        dispatch(authenticationSuccess(res));
                    });
                } else {
                    return res.json().then(res => dispatch(authenticationFailure(res)));
                }
            })
            .catch(err => dispatch(authenticationFailure(err)));
    };
}

export function checkCookie() {
    return dispatch => {
        dispatch(cookieRequest());
        let cookie = document.cookie;
        if (cookie !== "") {
            dispatch(authenticationSuccess(JSON.parse(cookie)));
        } else {
            dispatch(logOutSuccess());
        }
    };
}

export function authenticationRequest() {
    return {
        type: AUTHENTICATE
    };
}

export function cookieRequest() {
    return {
        type: CHECK_COOKIE
    };
}

export function authenticationSuccess(results) {
    return {
        type: AUTHENTICATION_SUCCESS,
        payload: {
            results
        }
    };
}

export function authenticationFailure(message) {
    return {
        type: AUTHENTICATION_FAILURE,
        payload: {
            message
        }
    };
}

export function logOut() {
    return dispatch => {
        dispatch(logOutRequest());
        const route = BASE_LOCATION + "/users/logout";
        return fetch(route, {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({}),
            credentials: "include"
        })
            .then(res => {
                // console.log(res.body);
                document.cookie = "";
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

export function logOutSuccess() {
    return { type: LOG_OUT_SUCCESS };
}

export function logOutFailure(message) {
    return {
        type: LOG_OUT_FAILURE,
        payload: {
            message
        }
    };
}

export function pageChange() {
    return {
        type: PAGE_CHANGE
    };
}
