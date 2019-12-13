import { GET_POSTS, GET_POSTS_SUCCESS, GET_POSTS_FAILURE, RESET_POSTS } from "../actions/getPosts";

const BASE_LOCATION = window.location.protocol + "//" + window.location.hostname + ":4040/api";

export function getPosts(userId, postId) {
    return dispatch => {
        dispatch(postsRequest());
        let route, body, credentials;
        if (userId === undefined) {
            // Get public posts
            route = BASE_LOCATION + "/posts/getPublicPosts";
            body = JSON.stringify({
                afterId: postId,
                postCount: 40
            });
            credentials = "omit";
        } else {
            // Get user posts
            route = BASE_LOCATION + "/posts/getUserPosts";
            body = JSON.stringify({
                userId: userId,
                afterId: postId,
                postCount: 40
            });
            credentials = "include";
        }
        return fetch(route, {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: body,
            credentials: credentials
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

export function postsRequest() {
    return {
        type: GET_POSTS
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
