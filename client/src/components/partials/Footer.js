import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import { FaInstagramSquare } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
import { FaAddressCard } from "react-icons/fa";
import { FiMail } from "react-icons/fi";

function Copyright() {
    return (
        <Typography variant={"body2"} color={"textSecondary"}>
            {"Copyright © "}
            <Link color={"inherit"} href={"/"}>
                Cedar House Candles
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    footer: {
        padding: theme.spacing(3, 2),

        backgroundColor: '#efd9d1',
    },
    iconsContainer: {
        display: "flex",

        alignItems: "center",
        justifyContent: "center",
    },
    icon: {
        marginLeft: "5px",
        marginRight: "5px",
    },
}));

export default function Footer() {
    const classes = useStyles();

    return (
        <footer className={classes.footer}>
            <Container className={classes.iconsContainer} maxWidth={"sm"}>
                <span className={classes.icon}>
                    <a
                        href="https://www.instagram.com/cedarhousecandles_/"
                        target="_blank"
                        rel="noreferrer"
                        style={{}}
                    >
                        <FaInstagramSquare size={30} color="black" />{" "}
                    </a>
                </span>
                <span className={classes.icon}>
                    <a
                        href="https://www.facebook.com/Cedar-House-Candles-111005277364483"
                        target="_blank"
                        rel="noreferrer"
                        style={{}}
                    >
                        <FaFacebookSquare size={30} color="blue" />{" "}
                    </a>
                </span>
                <span className={classes.icon}>
                    <a href="mailto:cedarhousecandles@gmail.com" style={{}}>
                        <FiMail size={35} color="red" />{" "}
                    </a>
                </span>
            </Container>
            <Container className={classes.iconsContainer} maxWidth={"sm"}>
                <Copyright />
            </Container>
        </footer>
    );
}
