import React, { useState, useContext } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { Store } from "../../store";
import { saveShippingAddress } from "../../store/actions/cartActions";

export default function AddressForm() {
    const { state, dispatch } = useContext(Store);
    const { shippingAddress } = state.cart;

    const [address1, setAddress1] = useState(shippingAddress.address1);
    const [address2, setAddress2] = useState(shippingAddress.address2);
    const [city, setCity] = useState(shippingAddress.city);
    const [addressState, setAddressState] = useState(
        shippingAddress.addressState
    );
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
    const [country, setCountry] = useState(shippingAddress.country);
    const [firstName, setFirstName] = useState(shippingAddress.firstName);
    const [lastName, setLastName] = useState(shippingAddress.lastName);

    const handleCheckboxChange = (e) => {
        if (e.target.checked) {
            saveShippingAddress({
                address1,
                address2,
                city,
                postalCode,
                country,
                lastName,
                firstName,
                addressState,
            })(dispatch);
        }
    };

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Shipping address
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        value={firstName}
                        id="firstName"
                        name="firstName"
                        label="First name"
                        fullWidth
                        autoComplete="given-name"
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        value={lastName}
                        id="lastName"
                        name="lastName"
                        label="Last name"
                        fullWidth
                        autoComplete="family-name"
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        value={address1}
                        id="address1"
                        name="address1"
                        label="Address line 1"
                        fullWidth
                        autoComplete="shipping address-line1"
                        onChange={(e) => setAddress1(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        value={address2}
                        id="address2"
                        name="address2"
                        label="Address line 2"
                        fullWidth
                        autoComplete="shipping address-line2"
                        onChange={(e) => setAddress2(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        value={city}
                        id="city"
                        name="city"
                        label="City"
                        fullWidth
                        autoComplete="shipping address-level2"
                        onChange={(e) => setCity(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        value={addressState}
                        id="state"
                        name="state"
                        label="State/Province/Region"
                        fullWidth
                        onChange={(e) => setAddressState(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        value={postalCode}
                        id="zip"
                        name="zip"
                        label="Zip / Postal code"
                        fullWidth
                        autoComplete="shipping postal-code"
                        onChange={(e) => setPostalCode(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        value={country}
                        id="country"
                        name="country"
                        label="Country"
                        fullWidth
                        autoComplete="shipping country"
                        onChange={(e) => setCountry(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                color="secondary"
                                name="saveAddress"
                                value="yes"
                                onChange={(e) => handleCheckboxChange(e)}
                            />
                        }
                        label="Use this address for payment details"
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}
