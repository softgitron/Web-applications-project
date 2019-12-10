import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import NewPostView from "../components/newPostView";

const BASE_LOCATION = window.location.protocol + "//" + window.location.hostname + ":4040";

class NewPostController extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handlePost = this.handlePost.bind(this);
        this.state = {
            title: "",
            text: "",
            visibility: true,
            rendering: false,
            message: "",
            newPostKey: 0
        };
    }

    componentDidUpdate() {
        let rendering = false;
        const userId = Number(
            this.props.location.pathname.substring(
                this.props.location.pathname.lastIndexOf("/") + 1
            )
        );
        if (this.props.location.pathname.includes("/user") && userId === this.props.user.userId) {
            rendering = true;
        } else {
            rendering = false;
        }
        if (rendering !== this.state.rendering) this.setState({ rendering: rendering });
    }

    handleChange(props) {
        if (props.target.type === "checkbox") {
            this.setState({ [props.target.id]: props.target.checked });
        } else {
            this.setState({ [props.target.id]: props.target.value });
        }
    }

    async handlePost() {
        const route = BASE_LOCATION + "/posts/newPost";
        let res = await fetch(route, {
            method: "post",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({
                title: this.state.title,
                text: this.state.text,
                visibility: Number(this.state.visibility)
            })
        });
        if (res.ok) {
            const newPostKey = this.state.newPostKey + 1;
            this.setState({
                title: "",
                text: "",
                visibility: true,
                rendering: true,
                message: "",
                newPostKey: newPostKey
            });
            this.props.history.push(this.props.location.pathname);
        } else {
            let newMessage = await res.json();
            newMessage = newMessage.errors;
            this.setState({ message: newMessage[0].msg + " " + newMessage[0].param });
        }
    }

    render() {
        let render;
        if (this.state.rendering === true) {
            render = (
                <NewPostView
                    key={"POST_" + this.state.newPostKey}
                    functions={{
                        handleChange: this.handleChange,
                        post: this.handlePost
                    }}
                    message={this.state.message}
                    visibility={this.state.visibility}
                ></NewPostView>
            );
        } else {
            render = <div></div>;
        }
        return <div>{render}</div>;
    }
}

export default withRouter(NewPostController);
