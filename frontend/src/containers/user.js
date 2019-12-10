import { compose } from "redux";
import { connect } from "react-redux";
import { asyncConnect } from "redux-connect";

import { signIn, signUp, logOut } from "../actionCreators/user";
import UserRouter from "../components/userRouter";

const _async = asyncConnect([
    {
        promise: ({ store: { dispatch } }) => {
            return dispatch(signIn());
        }
    }
]);
const mapStateToProps = state => {
    return {
        user: state.userReducer.user,
        message: state.userReducer.message,
        state: state.userReducer.state
    };
};
const mapDispatchToProps = dispatch => {
    return {
        signIn: credentials => {
            dispatch(signIn(credentials));
        },
        signUp: credentials => {
            dispatch(signUp(credentials));
        },
        logOut: () => {
            dispatch(logOut());
        }
    };
};
const _connect = connect(mapStateToProps, mapDispatchToProps);

export default compose(_async, _connect)(UserRouter);
