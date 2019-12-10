import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroller";

import PostView from "../components/postView";

class postController extends Component {
    constructor(props) {
        super(props);
        this.handleLocationChange = this.handleLocationChange.bind(this);
        this.updatePosts = this.updatePosts.bind(this);
        this.loadMore = this.loadMore.bind(this);
        this.handleClick = this.handleClick.bind(this);
        props.history.listen(this.handleLocationChange);
        this.state = {
            state: "LOADING",
            loaderText: "Loading...",
            loadMore: this.loadMore,
            interval: null
        };
    }

    handleLocationChange() {
        this.props.resetPosts();
    }

    componentDidUpdate() {
        this.updatePosts();
    }

    loadMore() {
        // Check are we trying to load user posts
        if (this.props.location.pathname.includes("/user")) {
            // https://stackoverflow.com/questions/4758103/last-segment-of-url
            const userId = this.props.location.pathname.substring(
                this.props.location.pathname.lastIndexOf("/") + 1
            );
            this.props.getUserPosts(userId, this.props.results.lastId);
        } else {
            this.props.getPublicPosts(this.props.results.lastId);
        }
    }

    updatePosts() {
        let newState;
        if (this.props.message) {
            let interval = null;
            if (this.state.interval === null) interval = setInterval(this.loadMore, 10000);
            newState = {
                state: "ERROR",
                loaderText: "ERROR: " + this.props.message,
                loadMore: () => {},
                interval: interval
            };
        } else {
            if (this.state.interval !== null) clearInterval(this.state.interval);
            newState = {
                state: "LOADING",
                loaderText: "Loading...",
                loadMore: this.loadMore,
                interval: null
            };
        }
        if (newState.state !== this.state.state) this.setState(newState);
    }

    handleClick(props) {
        const nickname = props.currentTarget.innerText;
        const posts = this.props.results.posts;
        const userId = posts.find(function(candidate) {
            return candidate.nickname === nickname;
        }).userId;
        this.props.history.push("/user/" + String(userId));
    }

    render() {
        return (
            <InfiniteScroll
                pageStart={0}
                loadMore={this.state.loadMore}
                hasMore={Boolean(this.props.results.lastId)}
                threshold={2000}
                loader={
                    <div
                        className="loader"
                        style={{ textAlign: "center", fontSize: 24, padding: 10 }}
                        key={0}
                    >
                        <b>{this.state.loaderText}</b>
                    </div>
                }
            >
                <PostView posts={this.props.results.posts} onClick={this.handleClick}></PostView>
            </InfiniteScroll>
        );
    }
}

export default withRouter(postController);
