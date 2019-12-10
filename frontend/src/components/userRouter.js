import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import SignInController from "./signInController";
import SignUpController from "./signUpController";
import Home from "../pages/home";

export const UserRouter = props => {
    return (
        <Router>
            <Switch>
                <Route path="/sign-in" render={() => <SignInController {...props} />} />
                <Route path="/sign-up" render={() => <SignUpController {...props} />} />
                <Route path="/*" render={() => <Home {...props} />} />
            </Switch>
        </Router>
    );
};
export default UserRouter;
