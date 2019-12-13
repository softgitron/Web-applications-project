import { connect } from "react-redux";

import { getPosts, resetPosts } from "../actionCreators/getPosts";
import postController from "../components/postController";

const mapStateToProps = state => {
    return {
        results: state.getPostsReducer.results,
        message: state.getPostsReducer.message,
        fetching: state.getPostsReducer.isFetching
    };
};
const mapDispatchToProps = dispatch => {
    return {
        getPosts: (userId, postId) => {
            dispatch(getPosts(userId, postId));
        },
        resetPosts: () => {
            dispatch(resetPosts());
        }
    };
};
const _connect = connect(mapStateToProps, mapDispatchToProps);

export default _connect(postController);
