import React, { Component } from "react";

import MenuController from "../components/menuController";
import InfiniteScroll from "react-infinite-scroller";
import Typography from "@material-ui/core/Typography";
import ContentView from "../components/contentView";

class Search extends Component {
    constructor(props) {
        super(props);
        this.loadMore = this.loadMore.bind(this);
        this.updateStatus = this.updateStatus.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            query: "",
            status: "LOADING",
            loaderText: "Loading...",
            loadMore: this.loadMore,
            isEmpty: false
        };
    }

    componentDidUpdate() {
        this.updateStatus();
    }

    loadMore() {
        if (this.props.fetching === true) return;
        let newQuery = this.props.router.location.pathname.substring(
            this.props.router.location.pathname.lastIndexOf("/") + 1
        );
        if (newQuery !== this.state.query) {
            this.setState({ query: newQuery });
        }
        const newQueryDetails = {
            userAfterId: this.props.results.lastUserId,
            postAfterId: this.props.results.lastPostId,
            query: newQuery
        };
        this.props.getSearchResults(newQueryDetails);
    }

    updateStatus() {
        let newState;
        if (this.props.message) {
            newState = {
                status: "ERROR",
                loaderText: "ERROR: " + this.props.message,
                loadMore: () => {}
            };
        } else {
            newState = {
                status: "LOADING",
                loaderText: "Loading...",
                loadMore: this.loadMore
            };
        }
        if (newState.status !== this.state.status) {
            this.setState(newState);
        }
    }

    handleClick(props) {
        const userId = props.currentTarget.dataset.id;
        this.props.router.history.push("/user/" + String(userId));
    }

    render() {
        let props = this.props;
        return (
            <div>
                <div style={{ height: "5em" }}></div>
                <MenuController {...props}></MenuController>
                <InfiniteScroll
                    pageStart={0}
                    loadMore={this.state.loadMore}
                    hasMore={
                        Boolean(this.props.results.lastUserId) &&
                        Boolean(this.props.results.lastPostId)
                    }
                    threshold={200}
                    loader={
                        <div style={{ textAlign: "center", padding: 10 }} key="LOADER_DIV">
                            <Typography variant="h5" component="p">
                                {this.state.loaderText}
                            </Typography>
                        </div>
                    }
                >
                    <ContentView
                        contents={this.props.results.users}
                        onClick={this.handleClick}
                        error={this.props.message}
                        pageTitle={"Users:"}
                        pageEmptyTitle={"No users found"}
                        fetching={this.props.fetching}
                    ></ContentView>
                    <ContentView
                        contents={this.props.results.posts}
                        onClick={this.handleClick}
                        error={this.props.message}
                        pageTitle={"Posts:"}
                        pageEmptyTitle={"No posts found"}
                        fetching={this.props.fetching}
                    ></ContentView>
                </InfiniteScroll>
            </div>
        );
    }
}

export default Search;
