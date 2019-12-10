import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { MuiThemeProvider } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import Link from "@material-ui/core/Link";
import { theme, style } from "../styles/menu";

// https://material-ui.com/components/app-bar/

const home = React.forwardRef((props, ref) => <RouterLink to="/" {...props} />);

function Menu(props) {
    const classes = style();

    return (
        <div>
            <MuiThemeProvider theme={theme}>
                <AppBar position="fixed">
                    <Toolbar>
                        <Typography variant="h6" className={classes.title}>
                            <Link component={home} to="/" className={classes.title} color="inherit">
                                Chirp Web
                            </Link>
                        </Typography>
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon />
                            </div>
                            <InputBase
                                placeholder="Search…"
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput
                                }}
                                inputProps={{ "aria-label": "search" }}
                            />
                        </div>
                        {props.buttons.map(button => (
                            <Button color="inherit" onClick={button.click} key={button.text}>
                                {button.text}
                            </Button>
                        ))}
                    </Toolbar>
                </AppBar>
            </MuiThemeProvider>
        </div>
    );
}

export default Menu;
