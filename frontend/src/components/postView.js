import React from "react";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { style } from "../styles/postView";

/* const tileData = [
    {
        postId: 1,
        nickname: "Ron",
        timestamp: "2019-12-07 09:58:54",
        title: "network dress surface swop",
        text: "cancel tree stress basin"
    },
    {
        postId: 2,
        nickname: "Nick",
        timestamp: "2019-12-07 09:58:54",
        title: "Hello World!",
        text: "Simple message"
    }
]; */

function postView(props) {
    const classes = style();
    let info = "";
    if (props.posts.length === 0) {
        info = "There are no posts yet on this page...";
    }
    return (
        <div className={classes.root}>
            <GridList cellHeight="auto" spacing={24} className={classes.gridList} cols={1}>
                {props.posts.map(post => (
                    <GridListTile key={post.postId}>
                        <Card className={classes.card}>
                            <CardContent>
                                <Typography variant="h5" component="h2">
                                    {post.title}
                                </Typography>
                                <Typography className={classes.pos}>
                                    <Link className={classes.nickname} onClick={props.onClick}>
                                        {post.nickname}
                                    </Link>{" "}
                                    @<i>{post.timestamp.slice(0, 16).replace("T", " ")}</i>
                                </Typography>
                                <Typography className={classes.text} variant="body2">
                                    {post.text}
                                </Typography>
                            </CardContent>
                        </Card>
                    </GridListTile>
                ))}
                <Typography variant="h5" component="p">
                    {info}
                </Typography>
            </GridList>
        </div>
    );
}

export default postView;
