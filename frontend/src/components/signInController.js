import React, { Component } from "react";

import SignInView from "../components/signInView";

class SignInController extends Component {
    constructor(props) {
        super(props);
        this.state = { email: "", password: "" };
        this.handleSignIn = this.handleSignIn.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSignIn() {
        const credentials = { email: this.state.email, password: this.state.password };
        this.props.authenticate(credentials);
    }

    componentDidUpdate() {
        // If there is no error message proceed to main page
        if (!this.props.error && this.props.user.userId !== -1) {
            this.props.router.history.push("/");
        }
    }

    handleChange(props) {
        this.setState({ [props.target.id]: props.target.value });
    }

    render() {
        return (
            <SignInView
                functions={{
                    handleChange: this.handleChange,
                    SignIn: this.handleSignIn
                }}
                message={this.props.message}
            ></SignInView>
        );
    }
}

export default SignInController;
