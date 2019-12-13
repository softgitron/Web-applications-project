import {
    NEW_POST,
    NEW_POST_SUCCESS,
    NEW_POST_FAILURE,
    INITIAL,
    RESET_STATUS
} from "../actions/newPost";
import errorParser from "../misc/errorParser";

const initialState = {
    newPostState: INITIAL,
    message: "",
    error: false
};

export function newPostReducer(state = initialState, action) {
    switch (action.type) {
        case NEW_POST:
            return state;

        case NEW_POST_SUCCESS:
            return Object.assign({}, state, {
                newPostState: NEW_POST_SUCCESS
            });

        case NEW_POST_FAILURE:
            let newMessage = errorParser(action.payload);
            return Object.assign({}, state, {
                newPostState: NEW_POST_FAILURE,
                message: newMessage,
                error: true
            });
        case RESET_STATUS:
            return Object.assign({}, state, initialState);

        default:
            return state;
    }
}
