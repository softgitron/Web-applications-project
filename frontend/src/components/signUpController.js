import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import SignUpView from "../components/signUpView";

class SignUpController extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            nickname: "",
            password: "",
            visibility: true
        };
        this.handleSignUp = this.handleSignUp.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSignUp() {
        const credentials = {
            email: this.state.email,
            nickname: this.state.nickname,
            password: this.state.password,
            visibility: Number(this.state.visibility)
        };
        this.props.signUp(credentials);
    }

    componentDidUpdate() {
        // If there is no error message proceed to main page
        if (!this.props.error && this.props.user.userId !== -1) {
            this.props.history.push("/");
        }
    }

    handleChange(props) {
        if (props.target.type === "checkbox") {
            this.setState({ [props.target.id]: props.target.checked });
        } else {
            this.setState({ [props.target.id]: props.target.value });
        }
    }

    render() {
        return (
            <SignUpView
                functions={{
                    handleChange: this.handleChange,
                    SignUp: this.handleSignUp
                }}
                message={this.props.message}
                visibility={this.state.visibility}
            ></SignUpView>
        );
    }
}

export default withRouter(SignUpController);
