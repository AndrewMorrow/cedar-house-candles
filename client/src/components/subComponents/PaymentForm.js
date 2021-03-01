import React, { useContext, useState } from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import {
    FormControl,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormLabel,
    Container,
    Button,
} from "@material-ui/core";
import { savePaymentMethod } from "../../store/actions/cartActions";
import { Store } from "../../store";

export default function PaymentForm() {
    const { dispatch } = useContext(Store);
    const [paymentMethod, setPaymentMethod] = useState("Paypal");

    const handleChange = (event) => {
        setPaymentMethod(event.target.value);
        savePaymentMethod(paymentMethod)(dispatch);
    };

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Payment method
            </Typography>
            <Grid container spacing={0}>
                <Grid item xs={12} md={12}>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">
                            Payment Options
                        </FormLabel>
                        <RadioGroup
                            aria-label="Payment Options"
                            name="paymentoptions"
                            value={paymentMethod}
                            onChange={handleChange}
                            style={{ marginBottom: "2rem" }}
                        >
                            <FormControlLabel
                                value="Paypal"
                                control={<Radio />}
                                label="Paypal or credit card"
                                name="paymentMethod"
                            />
                        </RadioGroup>
                    </FormControl>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}
