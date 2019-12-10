import { compose } from "redux";
import { connect } from "react-redux";
import { asyncConnect } from "redux-connect";

import { getPublicPosts, getUserPosts, resetPosts } from "../actionCreators/getPosts";
import postController from "../components/postController";

const _async = asyncConnect([
    {
        promise: ({ store: { dispatch } }) => {
            return dispatch(getPublicPosts());
        }
    }
]);
const mapStateToProps = state => {
    return {
        results: state.getPostsReducer.results,
        message: state.getPostsReducer.message
    };
};
const mapDispatchToProps = dispatch => {
    return {
        getPublicPosts: postId => {
            dispatch(getPublicPosts(postId));
        },
        getUserPosts: (userId, postId) => {
            dispatch(getUserPosts(userId, postId));
        },
        resetPosts: () => {
            dispatch(resetPosts());
        }
    };
};
const _connect = connect(mapStateToProps, mapDispatchToProps);

export default compose(_async, _connect)(postController);
