import React, { Component } from "react";
import { NEW_POST_SUCCESS } from "../actions/newPost";

import NewPostView from "../components/newPostView";

class NewPostController extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handlePost = this.handlePost.bind(this);
        this.state = {
            title: "",
            text: "",
            count: 0,
            visibility: true,
            message: "",
            newPostKey: 0
        };
    }

    handleChange(props) {
        if (props.target.type === "checkbox") {
            this.setState({ [props.target.id]: props.target.checked });
        } else {
            this.setState({ [props.target.id]: props.target.value });
        }
        if (props.target.id === "text") {
            this.setState({ count: props.target.value.length });
        }
    }

    componentDidUpdate() {
        if (this.props.newPostState === NEW_POST_SUCCESS) {
            const newPostKey = this.state.newPostKey + 1;
            this.setState({
                title: "",
                text: "",
                count: 0,
                visibility: true,
                message: "",
                newPostKey: newPostKey
            });
            this.props.resetStatus();
        }
    }

    handlePost() {
        const post = {
            title: this.state.title,
            text: this.state.text,
            visibility: Number(this.state.visibility)
        };
        this.props.newPost(post);
    }

    render() {
        return (
            <NewPostView
                key={"POST_" + this.state.newPostKey}
                functions={{
                    handleChange: this.handleChange,
                    post: this.handlePost
                }}
                message={this.props.message}
                visibility={this.state.visibility}
                title={this.state.title}
                text={this.state.text}
                count={this.state.count}
                getRawMarkup={this.getRawMarkup}
            ></NewPostView>
        );
    }
}

export default NewPostController;
