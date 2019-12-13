import { connect } from "react-redux";

import { authenticate, checkCookie, logOut, pageChange } from "../actionCreators/user";
import UserRouter from "../pages/userRouter";

const mapStateToProps = state => {
    return {
        user: state.userReducer.user,
        message: state.userReducer.message,
        authenticationState: state.userReducer.authenticationState
    };
};
const mapDispatchToProps = dispatch => {
    return {
        authenticate: credentials => {
            dispatch(authenticate(credentials));
        },
        checkCookie: () => {
            dispatch(checkCookie());
        },
        logOut: () => {
            dispatch(logOut());
        },
        pageChange: () => {
            dispatch(pageChange());
        }
    };
};
const _connect = connect(mapStateToProps, mapDispatchToProps);

export default _connect(UserRouter);
