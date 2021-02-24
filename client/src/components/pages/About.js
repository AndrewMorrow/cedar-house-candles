import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Grid,
    Paper,
    Typography,
    ButtonBase,
    Button,
    CardContent,
    CardActions,
    Card
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: "transparent"
    },
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        maxWidth: 950,
        backgroundColor: '#FEFBEA'
    },

    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    main: {
        display: 'flex',
        alignItems: 'center'
    }
}));

export default function OutlinedCard() {
    const classes = useStyles();

    return (
        <main className={classes.main}>
            <Paper className={classes.paper} elevation10>
                <Card className={classes.root} variant="outlined" margin3>
                    <CardContent>
                        <Typography variant="h5" component="h2" align="center">
                            <b>Store Policies</b>
                        </Typography>
                        <Typography className={classes.pos}>
                            Orders and Shipping
                        </Typography>
                        <Typography variant="body2" component="p">
                            Cedar House Candles strives to offer candles fit for
                            the current season. Each seasonal collection
                            contains its own unique scents, which are not
                            available in other collections. Our products are
                            available in limited quantities. Once the inventory
                            limit has been reached, the product will become
                            unavailable for purchase until it is restocked.
                            <br />
                            All orders are processed manually. Once you place an
                            order, please allow 1-3 business days for your order
                            to be shipped.
                        </Typography>
                        <br />
                        <Typography className={classes.pos}>
                            Refunds & Returns
                        </Typography>
                        <Typography variant="body2" component="p">
                            Due to the type of products offered, we do not
                            accept returns or exchanges. If there is an issue
                            with your purchase, please contact
                            cedarhousecandles@gmail.com, and we will be happy to
                            help!
                        </Typography>
                    </CardContent>
                </Card>
                <br />
                <Card className={classes.root} variant="outlined">
                    <CardContent>
                        <Typography variant="h5" component="h2" align="center">
                            <b>Product Information and Care</b>
                        </Typography>
                        <Typography className={classes.pos}>
                            Product Information
                        </Typography>
                        <Typography variant="body2" component="p">
                            All Cedar House Candles products are hand-made in
                            small batches with one-hundred percent soy wax. The
                            fragrance oils we use are high quality, phthalate
                            free and infused with natural essential oils to
                            deliver a clean-burning product. All candles are
                            made with a cotton wick which are lead- and
                            zinc-free.
                        </Typography>
                        <br />
                        <Typography className={classes.pos}>
                            Product Care
                        </Typography>
                        <Typography variant="body2" component="p">
                            Want a longer, cleaner burn? <br />
                            Upon initial burn, allow wax to reach a full melt
                            all around the perimeter of the jar. Before each
                            burn, trim candle wick to 1/4 inch. This will cut
                            down any extensive soot and help your candle last
                            longer. Stop burning and discard your candle once
                            the remaining wax has reached 1/2" deep.
                        </Typography>
                        <br />
                        <Typography variant="body2" component="p">
                            <b>Liability:</b> Never leave your candle
                            unattended. Always burn candles on a flat surface
                            away from flammable objects. Keep candles away from
                            children and pets. Cedar House Candles cannot be
                            held liable for using candles improperly.
                        </Typography>
                    </CardContent>
                </Card>
            </Paper>
        </main>
    );
}
