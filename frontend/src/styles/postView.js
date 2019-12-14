import { makeStyles } from "@material-ui/core/styles";

export const style = makeStyles(theme => ({
    root: {
        display: "flex",
        justifyContent: "space-around",
        backgroundColor: theme.palette.background.paper
    },
    gridList: {
        padding: 24,
        width: "90%",
        maxWidth: "80em"
    },
    card: {
        minWidth: 275,
        backgroundColor: "#f5f5f5"
    },
    bullet: {
        display: "inline-block",
        margin: "0 2px",
        transform: "scale(0.8)"
    },
    title: {
        fontSize: 14
    },
    pageTitle: {
        marginTop: 24
    },
    pos: {
        marginBottom: 12
    },
    titleField: {
        marginLeft: 10
    },
    form: {
        marginTop: 0
    },
    count: {
        marginTop: 6,
        fontSize: 16
    },
    nickname: {
        color: "#FF9800",
        fontWeight: "bold",
        "&:hover": {
            cursor: "pointer"
        }
    },
    content: {},
    text: {
        wordWrap: "break-word"
    },
    error: {
        marginTop: 6,
        fontSize: 16,
        color: "red"
    }
}));
