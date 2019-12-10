import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { LOG_OUT_SUCCESS, LOG_OUT_FAILURE } from "../actions/user";

import MenuView from "../components/menuView";

class menuController extends Component {
    constructor(props) {
        super(props);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.updateMenu = this.updateMenu.bind(this);
        this.state = {
            buttons: [{ oldState: LOG_OUT_SUCCESS, text: "Login", click: this.handlePageChange }]
        };
    }

    componentDidUpdate() {
        this.updateMenu();
    }

    componentDidMount() {
        this.updateMenu();
    }

    updateMenu() {
        let newState;
        switch (this.props.state) {
            case LOG_OUT_FAILURE:
                newState = {
                    buttons: [
                        { text: "Error please restart browser", click: this.handlePageChange }
                    ]
                };
                break;
            case LOG_OUT_SUCCESS:
                newState = {
                    buttons: [{ text: "Login", click: this.handlePageChange }]
                };
                break;
            default:
                newState = {
                    buttons: [
                        {
                            text: this.props.user.nickname + "'s page",
                            click: this.handlePageChange
                        },
                        { text: "Logout", click: this.handlePageChange }
                    ]
                };
        }
        if (this.state.oldState !== this.props.state) {
            this.setState(newState);
            this.setState({ oldState: this.props.state });
        }
    }

    handlePageChange(props) {
        if (props.target.innerText.includes("'S PAGE")) {
            this.props.history.push("/user/" + this.props.user.userId);
            return;
        }
        switch (props.target.innerText) {
            case "LOGIN":
                this.props.history.push("/sign-in");
                break;
            case "LOGOUT":
                this.props.logOut();
                this.props.history.push("/");
                break;
            default:
                this.props.history.push("/");
        }
    }

    render() {
        let props = this.state;
        return <MenuView {...props}></MenuView>;
    }
}

export default withRouter(menuController);
