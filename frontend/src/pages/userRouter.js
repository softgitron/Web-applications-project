import React, { Component } from "react";
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";

import SignInController from "../components/signInController";
import SignUpController from "../components/signUpController";
import Home from "./home";
import Search from "../containers/getSearch";

const history = createBrowserHistory();

class UserRouter extends Component {
    componentDidMount() {
        this.props.checkCookie();
        history.listen(this.props.pageChange);
    }

    render() {
        let props = this.props;
        return (
            <Router history={history}>
                <Switch>
                    <Route
                        path="/sign-in"
                        render={router => <SignInController {...props} router={router} />}
                    />
                    <Route
                        path="/sign-up"
                        render={router => <SignUpController {...props} router={router} />}
                    />
                    <Route
                        path="/search/*"
                        render={router => <Search {...props} router={router} />}
                    />
                    <Route path="/*" render={router => <Home {...props} router={router} />} />
                </Switch>
            </Router>
        );
    }
}

export default UserRouter;
