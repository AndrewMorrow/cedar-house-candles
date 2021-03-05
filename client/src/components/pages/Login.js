import React, { useEffect, useRef, useContext } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { loginUser, setErrors } from '../../store/actions/authActions';
import { Store } from '../../store';
import classnames from 'classnames';
import { ORDER_LIST_MY_RESET } from '../../store/actions/types';
import { Paper, Card } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        padding: theme.spacing(6),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#efd9d1',
        borderRadius: '1.25rem',
    },
    card: {
        padding: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',

        borderRadius: '1.25rem',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },

    button: {
        margin: theme.spacing(3, 0, 2),
        color: 'white',
        backgroundColor: '#999b84',

        '&:focus': {
            backgroundColor: 'transparent',
        },
    },
}));

const Login = (props) => {
    const classes = useStyles();
    const { state, dispatch } = useContext(Store);
    const errors = state.error;
    const emailRef = useRef();
    const passwordRef = useRef();

    useEffect(() => {
        if (state.auth.isAuthenticated) props.history.push('/dashboard');
    }, [state, props]);

    useEffect(() => {
        dispatch({
            type: ORDER_LIST_MY_RESET,
        });
        if (state.auth.isAuthenticated) props.history.push('/dashboard');
        // eslint-disable-next-line
    }, []);

    const onSubmit = (e) => {
        e.preventDefault();

        console.log(emailRef.current.value);

        dispatch(setErrors({ response: { data: {} } }));

        const userData = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };

        loginUser(userData, props.history)(dispatch);
    };

    return (
        <main>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Paper className={classes.paper}>
                    <Card className={classes.card}>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <form
                            className={classes.form}
                            noValidate
                            onSubmit={onSubmit}
                        >
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                type="email"
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                inputRef={emailRef}
                                error={errors.incorrect}
                                className={classnames('', {
                                    invalid: errors.incorrect,
                                })}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                inputRef={passwordRef}
                                error={errors.incorrect}
                                className={classnames('', {
                                    invalid: errors.incorrect,
                                })}
                            />

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                className={classes.button}
                            >
                                Sign In
                            </Button>
                            <Grid container>
                                <Grid item>
                                    <Link to="/register" variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </form>
                    </Card>
                </Paper>
            </Container>
        </main>
    );
};

export default Login;
