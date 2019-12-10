import {
    GET_PUBLIC_POSTS,
    GET_USER_POSTS,
    GET_POSTS_SUCCESS,
    GET_POSTS_FAILURE,
    RESET_POSTS
} from "../actions/getPosts";

import cleaner from "../components/cleaner";

const initialState = {
    isFetching: false,
    results: { lastId: 2147483647, posts: [] },
    message: ""
};

export function getPostsReducer(state = initialState, action) {
    switch (action.type) {
        case GET_PUBLIC_POSTS:
            return Object.assign({}, state, {
                isFetching: true
            });

        case GET_USER_POSTS:
            return Object.assign({}, state, {
                isFetching: true
            });

        case GET_POSTS_SUCCESS:
            let newResults = Object.assign({}, state.results);
            newResults.lastId = action.payload.results.lastId;
            newResults.posts = newResults.posts.concat(cleaner(action.payload.results.posts));
            return Object.assign({}, state, {
                isFetching: false,
                results: newResults,
                message: ""
            });

        case GET_POSTS_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                message: action.payload.message,
                error: true
            });
        case RESET_POSTS:
            return Object.assign({}, state, initialState);

        default:
            return state;
    }
}
