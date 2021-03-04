import React, { useContext } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { withRouter, Link } from 'react-router-dom';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { FaUserCircle } from 'react-icons/fa';
import { Button } from '@material-ui/core';
import { Store } from '../../store';
import { logoutUser } from '../../store/actions/authActions';
import { ORDER_LIST_MY_RESET } from '../../store/actions/types';

const useStyles = makeStyles((theme) => ({
    root: {
        marginBottom: '2rem',
        display: 'flex',
        alignContent: 'center',
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    headerOptions: {
        display: 'flex',
        alignItems: 'center',
    },
    button: {
        margin: "0px 8px",
        color: "white",
        "&:focus": {
            backgroundColor: "#d8ac9c",
        },
    },
    button2: {
        margin: "0px 8px",
        color: "white",
        fontSize: 25,

        '&:focus': {
            backgroundColor: 'transparent',
        },
    },
    appBar: {
        backgroundColor: '#999b84',
        padding: '1rem',
    },
}));

const Navbar = (props) => {
    const { state, dispatch } = useContext(Store);
    console.log(state);
    const { history } = props;
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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
    const onLogoutClick = () => {
        // e.preventDefault();
        dispatch({
            type: ORDER_LIST_MY_RESET,
        });
        // console.log(props.history)
        logoutUser(props.history)(dispatch);
    };

    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        <Button
                            variant="text"
                            className={classes.button2}
                            onClick={() => handleMenuClick('/')}
                        >
                            {' '}
                            <b>Cedar House Candles</b>{' '}
                        </Button>
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
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={open}
                                    onClose={() => setAnchorEl(null)}
                                >
                                    <MenuItem
                                        onClick={() => handleMenuClick('/shop')}
                                    >
                                        Shop
                                    </MenuItem>
                                    <MenuItem
                                        onClick={() =>
                                            handleMenuClick('/about')
                                        }
                                    >
                                        About
                                    </MenuItem>
                                    <MenuItem
                                        onClick={() => handleMenuClick('/cart')}
                                    >
                                        Cart
                                    </MenuItem>
                                    {state.auth.isAuthenticated ? (
                                        <>
                                            <MenuItem
                                                onClick={() =>
                                                    handleMenuClick(
                                                        '/dashboard'
                                                    )
                                                }
                                            >
                                                Dashboard{' '}
                                            </MenuItem>
                                            <MenuItem
                                                onClick={() => onLogoutClick()}
                                            >
                                                Logout
                                            </MenuItem>
                                        </>
                                    ) : (
                                        <MenuItem
                                            onClick={() =>
                                                handleMenuClick('/login')
                                            }
                                        >
                                            {' '}
                                            Login
                                        </MenuItem>
                                    )}
                                </Menu>
                            </>
                        ) : (
                            <div className={classes.headerOptions}>
                                <Button
                                    className={classes.button}
                                    onClick={() => handleButtonClick('/shop')}
                                >
                                    Shop
                                </Button>
                                <Button
                                    className={classes.button}
                                    onClick={() => handleButtonClick('/about')}
                                >
                                    About
                                </Button>
                                <Button
                                    className={classes.button}
                                    onClick={() => handleButtonClick('/cart')}
                                >
                                    Cart
                                </Button>

                                {state.auth.isAuthenticated ? (
                                    <>
                                        <Button
                                            className={classes.button}
                                            onClick={() =>
                                                handleButtonClick('/dashboard')
                                            }
                                        >
                                            Dashboard{' '}
                                        </Button>
                                        <Button
                                            className={classes.button}
                                            onClick={() => onLogoutClick()}
                                        >
                                            Logout
                                        </Button>
                                    </>
                                ) : (
                                    <Button
                                        className={classes.button}
                                        onClick={() =>
                                            handleButtonClick('/login')
                                        }
                                    >
                                        {' '}
                                        Login
                                    </Button>
                                )}
                            </div>
                        )}
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default withRouter(Navbar);
