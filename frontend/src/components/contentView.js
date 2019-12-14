import React from "react";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { style } from "../styles/postView";
import getRawMarkup from "../misc/gerMarkup";
import "../styles/content.css";

function contentView(props) {
    const classes = style();
    let info = "";
    if (props.fetching === true) {
        info = "";
    } else if (props.contents.length === 0 && !props.error) {
        info = props.pageEmptyTitle;
    } else {
        info = props.pageTitle;
    }
    return (
        <div className={classes.root}>
            <GridList cellHeight="auto" spacing={24} className={classes.gridList} cols={1}>
                <Typography className={classes.pageTitle} variant="h4" component="p">
                    {info}
                </Typography>
                {props.contents.map(content => (
                    <GridListTile key={"CONTENT_" + content.postId + "_" + content.userId}>
                        <Card className={classes.card}>
                            <CardContent>
                                <Typography variant="h5" component="h2">
                                    {content.title}
                                </Typography>
                                <Typography className={classes.pos}>
                                    <Link
                                        data-id={content.userId}
                                        className={classes.nickname}
                                        onClick={props.onClick}
                                    >
                                        {content.nickname}
                                    </Link>{" "}
                                    @
                                    <i>
                                        {content.timestamp
                                            ? content.timestamp.slice(0, 16).replace("T", " ")
                                            : ""}
                                    </i>
                                </Typography>
                                <div
                                    className={"content " + classes.content}
                                    dangerouslySetInnerHTML={getRawMarkup(content.text)}
                                />
                            </CardContent>
                        </Card>
                    </GridListTile>
                ))}
            </GridList>
        </div>
    );
}

export default contentView;
