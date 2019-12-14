import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

export function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {"Made by Roni Juntunen "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

export const style = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1)
    },
    submit: {
        margin: theme.spacing(3, 0, 2)
    },
    error: {
        fontSize: 16,
        color: "red"
    }
}));
