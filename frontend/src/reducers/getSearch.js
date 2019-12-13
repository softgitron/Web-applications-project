import { GET_SEARCH_RESULTS, SEARCH_SUCCESS, SEARCH_FAILURE } from "../actions/getSearch";
import { PAGE_CHANGE } from "../actions/user";

import cleaner from "../misc/cleaner";
import errorParser from "../misc/errorParser";

const initialState = {
    isFetching: false,
    results: { lastUserId: 2147483647, lastPostId: 2147483647, users: [], posts: [] },
    message: ""
};

export function getSearchReducer(state = initialState, action) {
    switch (action.type) {
        case GET_SEARCH_RESULTS:
            return Object.assign({}, state, {
                isFetching: true
            });

        case SEARCH_SUCCESS:
            let newResults = Object.assign({}, state.results);
            newResults.lastUserId = action.payload.results.lastUserId;
            newResults.lastPostId = action.payload.results.lastPostId;
            newResults.posts = newResults.posts.concat(cleaner(action.payload.results.posts));
            newResults.users = newResults.users.concat(cleaner(action.payload.results.users));
            return Object.assign({}, state, {
                isFetching: false,
                results: newResults,
                message: ""
            });

        case SEARCH_FAILURE:
            let newMessage = errorParser(action.payload);
            return Object.assign({}, state, {
                isFetching: false,
                message: newMessage,
                error: true
            });

        case PAGE_CHANGE:
            let newState = initialState;
            newState.isFetching = state.isFetching;
            return Object.assign({}, state, newState);

        default:
            return state;
    }
}
