import React, { useContext, useState } from "react";
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

const PaymentMethod = ({ history }) => {
    const { state, dispatch } = useContext(Store);
    const [paymentMethod, setPaymentMethod] = useState("Paypal");

    const handleChange = (event) => {
        setPaymentMethod(event.target.value);
        savePaymentMethod(paymentMethod)(dispatch);
    };

    const handleSubmit = () => {
        savePaymentMethod(paymentMethod)(dispatch);
        history.push("/placeorder");
    };

    return (
        <main>
            <Container maxWidth="sm" fixed>
                <h2>Payment Methods</h2>
                <FormControl component="fieldset">
                    <FormLabel component="legend">Payment Options</FormLabel>
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
                    <Button onClick={handleSubmit} variant="contained">
                        Continue
                    </Button>
                </FormControl>
            </Container>
        </main>
    );
};

export default PaymentMethod;
