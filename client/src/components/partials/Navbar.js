import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { withRouter } from "react-router-dom";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        marginBottom: "2rem",
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    headerOptions: {
        justifyContent: "space-evenly",
    },
    button: {
        margin: "0px 8px",
        color: "white",
    },
    appBar: {
        backgroundColor: "#212121",
    },
}));

const Navbar = (props) => {
    console.log(props);
    const { history } = props;
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClick = (newRoute) => {
        history.push(newRoute);
        setAnchorEl(null);
    };

    const handleButtonClick = (newRoute) => {
        history.push(newRoute);
    };

    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.appBar}>
                <Toolbar>
                    <Typography
                        variant="h6"
                        className={classes.title}
                        onClick={() => handleMenuClick("/")}
                    >
                        Cedar House Candles
                    </Typography>

                    <div>
                        {isMobile ? (
                            <>
                                <IconButton
                                    edge="start"
                                    className={classes.menuButton}
                                    color="inherit"
                                    aria-label="menu"
                                    onClick={handleMenu}
                                >
                                    <MenuIcon />
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                        vertical: "top",
                                        horizontal: "right",
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: "top",
                                        horizontal: "right",
                                    }}
                                    open={open}
                                    onClose={() => setAnchorEl(null)}
                                >
                                    <MenuItem
                                        onClick={() => handleMenuClick("/shop")}
                                    >
                                        Shop
                                    </MenuItem>
                                    <MenuItem
                                        onClick={() =>
                                            handleMenuClick("/about")
                                        }
                                    >
                                        About
                                    </MenuItem>
                                    <MenuItem
                                        onClick={() => handleMenuClick("/cart")}
                                    >
                                        Portfolio
                                    </MenuItem>
                                    <MenuItem
                                        onClick={() =>
                                            handleMenuClick("/login")
                                        }
                                    >
                                        Login
                                    </MenuItem>
                                </Menu>
                            </>
                        ) : (
                            <div className={classes.headerOptions}>
                                <Button
                                    className={classes.button}
                                    onClick={() => handleButtonClick("/shop")}
                                >
                                    Shop
                                </Button>
                                <Button
                                    className={classes.button}
                                    onClick={() => handleButtonClick("/about")}
                                >
                                    About
                                </Button>
                                <Button
                                    className={classes.button}
                                    onClick={() => handleButtonClick("/cart")}
                                >
                                    Cart
                                </Button>
                                <Button
                                    className={classes.button}
                                    onClick={() => handleButtonClick("/login")}
                                >
                                    Login
                                </Button>
                            </div>
                        )}
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default withRouter(Navbar);
