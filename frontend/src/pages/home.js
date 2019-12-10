import React from "react";

import MenuController from "../components/menuController";
// import PostView from "../components/postView";
import PostController from "../containers/getPosts";
import NewPostController from "../components/newPostController";

export const Home = props => {
    return (
        <div>
            <MenuController {...props}></MenuController>
            <div style={{ height: "5em" }}></div>
            <NewPostController {...props}></NewPostController>
            <PostController></PostController>
        </div>
    );
};

export default Home;
