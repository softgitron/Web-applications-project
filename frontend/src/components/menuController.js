import React, { Component } from "react";
import { LOG_OUT_SUCCESS, LOG_OUT_FAILURE, AUTHENTICATION_SUCCESS } from "../actions/user";

import MenuView from "../components/menuView";

class menuController extends Component {
    constructor(props) {
        super(props);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleQueryChange = this.handleQueryChange.bind(this);
        this.updateMenu = this.updateMenu.bind(this);
        this.state = {
            buttons: [{ oldState: LOG_OUT_SUCCESS, text: "Login", click: this.handlePageChange }],
            query: ""
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
        switch (this.props.authenticationState) {
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
            case AUTHENTICATION_SUCCESS:
                newState = {
                    buttons: [
                        {
                            text: this.props.user.nickname + "'s page",
                            click: this.handlePageChange
                        },
                        { text: "Logout", click: this.handlePageChange }
                    ]
                };
                break;
            default:
                newState = {
                    buttons: [{ text: "Login", click: this.handlePageChange }]
                };
        }
        if (this.state.oldState !== this.props.authenticationState) {
            this.setState(newState);
            this.setState({ oldState: this.props.authenticationState });
        }
    }

    handlePageChange(props) {
        if (props.target.innerText.includes("'S PAGE")) {
            this.props.router.history.push("/user/" + this.props.user.userId);
            return;
        }
        switch (props.target.innerText) {
            case "LOGIN":
                this.props.router.history.push("/sign-in");
                break;
            case "LOGOUT":
                this.props.logOut();
                this.props.router.history.push("/");
                break;
            default:
                this.props.router.history.push("/");
        }
    }

    handleSearch() {
        this.props.router.history.push("/search/" + this.state.query);
    }

    handleQueryChange(props) {
        this.setState({ query: props.target.value });
    }

    render() {
        let props = this.state;
        return (
            <MenuView
                {...props}
                doSearch={this.handleSearch}
                onSearchChange={this.handleQueryChange}
            ></MenuView>
        );
    }
}

export default menuController;
