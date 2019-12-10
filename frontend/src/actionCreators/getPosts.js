import {
    GET_PUBLIC_POSTS,
    GET_POSTS_SUCCESS,
    GET_POSTS_FAILURE,
    RESET_POSTS,
    GET_USER_POSTS
} from "../actions/getPosts";

const BASE_LOCATION = window.location.protocol + "//" + window.location.hostname + ":4040";

export function getPublicPosts(postId) {
    return dispatch => {
        dispatch(publicPostsRequest());
        const route = BASE_LOCATION + "/posts/getPublicPosts";
        return fetch(route, {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                afterId: postId,
                postCount: 40
            })
        })
            .then(res => {
                // console.log(res.body);
                if (res.ok) {
                    return res.json().then(res => dispatch(postsSuccess(res)));
                } else {
                    return res.json().then(res => dispatch(postsFailure(res)));
                }
            })
            .catch(err => dispatch(postsFailure(err)));
    };
}

export function getUserPosts(userId, postId) {
    return dispatch => {
        dispatch(userPostsRequest());
        const route = BASE_LOCATION + "/posts/getUserPosts";
        return fetch(route, {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                userId: userId,
                afterId: postId,
                postCount: 40
            }),
            credentials: "include"
        })
            .then(res => {
                // console.log(res.body);
                if (res.ok) {
                    return res.json().then(res => dispatch(postsSuccess(res)));
                } else {
                    return res.json().then(res => dispatch(postsFailure(res)));
                }
            })
            .catch(err => dispatch(postsFailure(err)));
    };
}

export function publicPostsRequest() {
    return {
        type: GET_PUBLIC_POSTS
    };
}

export function userPostsRequest() {
    return {
        type: GET_USER_POSTS
    };
}

export function postsSuccess(results) {
    return {
        type: GET_POSTS_SUCCESS,
        payload: {
            results
        }
    };
}

export function postsFailure(message) {
    return {
        type: GET_POSTS_FAILURE,
        payload: {
            message
        }
    };
}

export function resetPosts() {
    return {
        type: RESET_POSTS
    };
}
