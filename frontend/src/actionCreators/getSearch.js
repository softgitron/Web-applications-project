import { GET_SEARCH_RESULTS, SEARCH_SUCCESS, SEARCH_FAILURE } from "../actions/getSearch";

const BASE_LOCATION = window.location.protocol + "//" + window.location.hostname + "/api";

export function getSearchResults(query) {
    return dispatch => {
        dispatch(newSearchRequest());
        if (query.query === "") {
            return dispatch(searchSuccess({ lastUserId: 0, lastPostId: 0, users: [], posts: [] }));
        }
        const route = BASE_LOCATION + "/search/fuzzy";
        return fetch(route, {
            method: "post",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(query)
        })
            .then(res => {
                // console.log(res.body);
                if (res.ok) {
                    return res.json().then(res => dispatch(searchSuccess(res)));
                } else {
                    return res.json().then(res => dispatch(searchFailure(res)));
                }
            })
            .catch(err => dispatch(searchFailure(err)));
    };
}

export function newSearchRequest() {
    return {
        type: GET_SEARCH_RESULTS
    };
}

export function searchSuccess(results) {
    return {
        type: SEARCH_SUCCESS,
        payload: {
            results
        }
    };
}

export function searchFailure(message) {
    return {
        type: SEARCH_FAILURE,
        payload: {
            message
        }
    };
}
