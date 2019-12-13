import React, { Component } from "react";
import InfiniteScroll from "react-infinite-scroller";
import Typography from "@material-ui/core/Typography";

import ContentView from "./contentView";

class postController extends Component {
    constructor(props) {
        super(props);
        this.updatePosts = this.updatePosts.bind(this);
        this.loadMore = this.loadMore.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            status: "LOADING",
            loaderText: "Loading...",
            pageTitle: "Around Chirp Web",
            loadMore: this.loadMore,
            interval: null
        };
    }

    componentDidUpdate() {
        this.updatePosts();
    }

    componentWillUnmount() {
        clearInterval(this.state.interval);
    }

    loadMore() {
        if (this.props.fetching === true) return;
        // Check are we trying to load user posts
        let userId;
        if (this.props.router.location.pathname.includes("/user")) {
            // https://stackoverflow.com/questions/4758103/last-segment-of-url
            userId = this.props.router.location.pathname.substring(
                this.props.router.location.pathname.lastIndexOf("/") + 1
            );
        }
        this.props.getPosts(userId, this.props.results.lastId);
    }

    updatePosts() {
        let newState;
        if (this.props.message) {
            let interval = null;
            if (this.state.interval === null) interval = setInterval(this.loadMore, 10000);
            newState = {
                status: "ERROR",
                loaderText: "ERROR: " + this.props.message,
                loadMore: () => {},
                interval: interval
            };
        } else {
            if (this.state.interval !== null) clearInterval(this.state.interval);
            newState = {
                status: "LOADING",
                loaderText: "Loading...",
                loadMore: this.loadMore,
                interval: null
            };
        }
        if (newState.status !== this.state.status) {
            this.setState(newState);
        }
        // Handle page's title
        let newTitle;
        if (this.props.router.location.pathname.includes("/user")) {
            if (this.props.results.posts.length !== 0) {
                newTitle = this.props.results.posts[0].nickname + "'s page";
            }
        } else if (this.props.router.location.pathname === "/") {
            newTitle = "Around Chirp Web";
        }
        if (newTitle !== this.state.pageTitle) this.setState({ pageTitle: newTitle });
    }

    handleClick(props) {
        const userId = props.currentTarget.dataset.id;
        this.props.router.history.push("/user/" + String(userId));
        // this.setState({ pageTitle: nickname + "'s page" });
    }

    render() {
        return (
            <InfiniteScroll
                pageStart={0}
                loadMore={this.state.loadMore}
                hasMore={Boolean(this.props.results.lastId)}
                threshold={2000}
                loader={
                    <div style={{ textAlign: "center", padding: 10 }} key="LOADER_DIV">
                        <Typography variant="h5" component="p">
                            {this.state.loaderText}
                        </Typography>
                    </div>
                }
            >
                <ContentView
                    contents={this.props.results.posts}
                    onClick={this.handleClick}
                    error={this.props.message}
                    pageTitle={this.state.pageTitle}
                    pageEmptyTitle={"There are no posts yet on this page..."}
                    fetching={this.props.fetching}
                ></ContentView>
            </InfiniteScroll>
        );
    }
}

export default postController;
