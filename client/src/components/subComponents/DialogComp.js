import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { Link } from "react-router-dom";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide({
    handleDialogClose,
    handleDialogOpen,
    dialogOpen,
}) {
    return (
        <div>
            <Dialog
                open={dialogOpen}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleDialogClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">
                    You are not logged in!
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Logging in will give you access to your order history on
                        your dashboard. However this is not necessary to
                        complete an order. Would you like to login?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Link to="/login">
                        <Button onClick={handleDialogClose} color="secondary">
                            Login
                        </Button>
                    </Link>
                    <Link to="/checkout">
                        <Button onClick={handleDialogClose} color="secondary">
                            Continue as Guest
                        </Button>
                    </Link>
                </DialogActions>
            </Dialog>
        </div>
    );
}
