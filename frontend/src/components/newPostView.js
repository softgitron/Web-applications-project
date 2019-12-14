import React from "react";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { style } from "../styles/postView";
import getRawMarkup from "../misc/gerMarkup";
import "../styles/content.css";

function postView(props) {
    const classes = style();

    let countColor;
    if (props.count > 320) {
        countColor = "red";
    } else {
        countColor = "black";
    }

    return (
        <div className={classes.root}>
            <GridList cellHeight="auto" spacing={24} className={classes.gridList} cols={1}>
                <GridListTile>
                    <Card className={classes.card}>
                        <CardContent>
                            <Typography variant="h5" component="h2">
                                New post
                            </Typography>
                            <form
                                className={classes.form}
                                onSubmit={e => {
                                    e.preventDefault();
                                }}
                            >
                                <Grid container spacing={2}>
                                    <Grid item xs={4}>
                                        <TextField
                                            className={classes.titleField}
                                            required
                                            fullWidth
                                            name="title"
                                            label="Post title"
                                            id="title"
                                            onChange={props.functions.handleChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            variant="filled"
                                            fullWidth
                                            multiline
                                            name="text"
                                            label="Post text"
                                            id="text"
                                            onChange={props.functions.handleChange}
                                        />
                                    </Grid>
                                    <Grid item xs={"auto"} style={{ padding: 0, paddingLeft: 8 }}>
                                        <Typography
                                            className={classes.count}
                                            style={{ color: countColor }}
                                        >
                                            {props.count + "/320"}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={8} style={{ padding: 0, paddingLeft: 8 }}>
                                        <Typography className={classes.error}>
                                            {props.message}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} style={{ paddingBottom: 0 }}>
                                        <Link
                                            href="https://jonschlinkert.github.io/remarkable/demo/"
                                            variant="body2"
                                        >
                                            {"Markup tips (external site)"}
                                        </Link>
                                    </Grid>
                                </Grid>
                                <Grid
                                    container
                                    spacing={2}
                                    className={classes.form}
                                    justify="flex-end"
                                >
                                    <Grid item xs={"auto"}>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    id="visibility"
                                                    color="primary"
                                                    checked={props.visibility}
                                                    onChange={props.functions.handleChange}
                                                />
                                            }
                                            label="Public post"
                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            color="primary"
                                            className={classes.submit}
                                            onClick={props.functions.post}
                                        >
                                            Post
                                        </Button>
                                    </Grid>
                                </Grid>
                            </form>
                        </CardContent>
                    </Card>
                </GridListTile>
                <GridListTile>
                    <Card className={classes.card}>
                        <CardContent>
                            <Typography variant="h5" component="h2">
                                Post preview:
                            </Typography>
                            <br></br>
                            <Typography variant="h5" component="h2">
                                {props.title}
                            </Typography>
                            <div
                                className={"content " + classes.content}
                                dangerouslySetInnerHTML={getRawMarkup(props.text)}
                            />
                        </CardContent>
                    </Card>
                </GridListTile>
            </GridList>
        </div>
    );
}

export default postView;
