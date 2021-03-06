import { GET_POSTS, GET_POSTS_SUCCESS, GET_POSTS_FAILURE, RESET_POSTS } from "../actions/getPosts";
import { PAGE_CHANGE } from "../actions/user";
import { NEW_POST_SUCCESS } from "../actions/newPost";

import cleaner from "../misc/cleaner";
import errorParser from "../misc/errorParser";

const initialState = {
    isFetching: false,
    results: { lastId: 2147483647, posts: [] },
    message: ""
};

export function getPostsReducer(state = initialState, action) {
    switch (action.type) {
        case GET_POSTS:
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
            let newMessage = errorParser(action.payload);
            return Object.assign({}, state, {
                isFetching: false,
                message: newMessage,
                error: true
            });
        case RESET_POSTS:
        case PAGE_CHANGE:
        case NEW_POST_SUCCESS:
            let newState = initialState;
            newState.isFetching = state.isFetching;
            return Object.assign({}, state, newState);

        default:
            return state;
    }
}
