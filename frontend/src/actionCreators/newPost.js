import { NEW_POST, NEW_POST_SUCCESS, NEW_POST_FAILURE, RESET_STATUS } from "../actions/newPost";

const BASE_LOCATION = window.location.protocol + "//" + window.location.hostname + "/api";

export function newPost(newPost) {
    return dispatch => {
        dispatch(newPostRequest());
        const route = BASE_LOCATION + "/posts/newPost";
        return fetch(route, {
            method: "post",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(newPost)
        })
            .then(res => {
                // console.log(res.body);
                if (res.ok) {
                    return res.json().then(res => dispatch(newPostSuccess(res)));
                } else {
                    return res.json().then(res => dispatch(newPostFailure(res)));
                }
            })
            .catch(err => dispatch(newPostFailure(err)));
    };
}

export function newPostRequest() {
    return {
        type: NEW_POST
    };
}

export function newPostSuccess(results) {
    return {
        type: NEW_POST_SUCCESS,
        payload: {
            results
        }
    };
}

export function newPostFailure(message) {
    return {
        type: NEW_POST_FAILURE,
        payload: {
            message
        }
    };
}

export function resetStatus() {
    return {
        type: RESET_STATUS
    };
}
