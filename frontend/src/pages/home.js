import React, { Component } from "react";

import MenuController from "../components/menuController";
// import PostView from "../components/postView";
import PostController from "../containers/getPosts";
import NewPostController from "../containers/newPost";

class Home extends Component {
    constructor(props) {
        super(props);
        this.updateStatus = this.updateStatus.bind(this);
        this.state = { renderNewPost: false };
    }

    componentDidMount() {
        this.updateStatus();
    }

    componentDidUpdate() {
        this.updateStatus();
    }

    updateStatus() {
        let renderNewPost = false;
        const userId = Number(
            this.props.router.location.pathname.substring(
                this.props.router.location.pathname.lastIndexOf("/") + 1
            )
        );
        if (
            this.props.router.location.pathname.includes("/user") &&
            userId === this.props.user.userId
        ) {
            renderNewPost = true;
        } else {
            renderNewPost = false;
        }
        if (renderNewPost !== this.state.renderNewPost)
            this.setState({ renderNewPost: renderNewPost });
    }

    render() {
        let render;
        let props = this.props;
        if (this.state.renderNewPost === true) {
            render = <NewPostController {...props}></NewPostController>;
        } else {
            render = <div></div>;
        }
        return (
            <div>
                <MenuController {...props}></MenuController>
                <div style={{ height: "4em" }}></div>
                {render}
                <PostController router={props.router}></PostController>
            </div>
        );
    }
}

export default Home;
