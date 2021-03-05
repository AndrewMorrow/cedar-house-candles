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
import { Store } from '../../store';
import { registerUser, setErrors } from '../../store/actions/authActions';
import classnames from 'classnames';
import { Paper, Card } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(3),
        backgroundColor: "#efd9d1",
        borderRadius: "1.25rem",
        marginBottom: theme.spacing(3),
        padding: theme.spacing(1),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
          marginTop: theme.spacing(6),
          marginBottom: theme.spacing(6),
          padding: theme.spacing(4),
        },
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
        marginTop: theme.spacing(3),
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

const Register = (props) => {
    const classes = useStyles();
    const { state, dispatch } = useContext(Store);
    const errors = state.error;
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const password2Ref = useRef();

    useEffect(() => {
        if (state.auth.isAuthenticated) props.history.push('/dashboard');
    }, [state, props]);

    const onSubmit = (e) => {
        e.preventDefault();

        dispatch(setErrors({ response: { data: {} } }));

        const userData = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password2: password2Ref.current.value,
        };

        registerUser(userData, props.history)(dispatch);
    };

    return (
        <Container maxWidth="xs">
            <CssBaseline />
            <Paper className={classes.paper}>
                <Card className={classes.card}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <form
                        className={classes.form}
                        noValidate
                        onSubmit={onSubmit}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    autoComplete="name"
                                    name="name"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="name"
                                    label="Name"
                                    autoFocus
                                    inputRef={nameRef}
                                    error={errors.name}
                                    className={classnames('', {
                                        invalid: errors.name,
                                    })}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    inputRef={emailRef}
                                    error={errors.email}
                                    type="email"
                                    className={classnames('', {
                                        invalid: errors.email,
                                    })}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    inputRef={passwordRef}
                                    error={errors.password}
                                    type="password"
                                    className={classnames('', {
                                        invalid: errors.password,
                                    })}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="password2"
                                    label="Password2"
                                    type="password2"
                                    id="password2"
                                    autoComplete="current-password2"
                                    inputRef={password2Ref}
                                    error={errors.password2}
                                    type="password"
                                    className={classnames('', {
                                        invalid: errors.password2,
                                    })}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            className={classes.button}
                        >
                            Sign Up
                        </Button>
                        <Grid container justify="flex-end">
                            <Grid item>
                                <Link to="/login" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </Card>
            </Paper>
        </Container>
    );
};

export default Register;
