import React, { useContext } from "react";
import { Select, MenuItem } from "@material-ui/core";
// import { changeCartQty } from "../../store/actions/cartActions.js";
import { Store } from "../../store";

const SelectComp = ({ item, handleChange }) => {
    const { state, dispatch } = useContext(Store);
    const [open, setOpen] = React.useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    return (
        <>
            <Select
                labelId="demo-controlled-open-select-label"
                id="demo-controlled-open-select"
                open={open}
                onClose={handleClose}
                onOpen={handleOpen}
                value={item.cartQty}
                onChange={(e) => handleChange(e, item)}
            >
                {[...Array(item.countInStock).keys()].map((x) => (
                    <MenuItem key={x + 1} value={x + 1}>
                        {x + 1}{" "}
                    </MenuItem>
                ))}
            </Select>
        </>
    );
};

export default SelectComp;
