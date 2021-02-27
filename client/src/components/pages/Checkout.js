import React from "react";
import {
    FormControl,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormLabel,
} from "@material-ui/core";

const Checkout = () => {
    const [value, setValue] = React.useState("female");

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    return (
        <FormControl component="fieldset">
            <FormLabel component="legend">Gender</FormLabel>
            <RadioGroup
                aria-label="gender"
                name="gender1"
                value={value}
                onChange={handleChange}
            >
                <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Female"
                />
                <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Male"
                />
                <FormControlLabel
                    value="other"
                    control={<Radio />}
                    label="Other"
                />
                <FormControlLabel
                    value="disabled"
                    disabled
                    control={<Radio />}
                    label="(Disabled option)"
                />
            </RadioGroup>
        </FormControl>
    );
};

export default Checkout;
