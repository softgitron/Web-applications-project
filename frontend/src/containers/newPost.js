import { connect } from "react-redux";

import { newPost, resetStatus } from "../actionCreators/newPost";
import newPostController from "../components/newPostController";

const mapStateToProps = state => {
    return {
        newPostState: state.newPostReducer.newPostState,
        message: state.newPostReducer.message
    };
};
const mapDispatchToProps = dispatch => {
    return {
        newPost: post => {
            dispatch(newPost(post));
        },
        resetStatus: () => {
            dispatch(resetStatus());
        }
    };
};
const _connect = connect(mapStateToProps, mapDispatchToProps);

export default _connect(newPostController);
