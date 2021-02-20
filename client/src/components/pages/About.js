import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

export default function OutlinedCard() {
    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;

    return (
        <Card className={classes.root} variant="outlined">
            <CardContent>
                <Typography variant="h5" component="h2">
                    <b>Store Policies</b>
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    Orders and Shipping
                </Typography>
                <Typography variant="body2" component="p">
                    Cedar House Candles strives to offer candles fit for the
                    current season. Each seasonal collection contains its own
                    unique scents, which are not available in other collections.
                    Our products are available in limited quantities. Once the
                    inventory limit has been reached, the product will become
                    unavailable for purchase until it is restocked.
                    <br />
                    All orders are processed manually. Once you place an order,
                    please allow 1-3 business days for your order to be shipped.
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    Refunds & Returns
                </Typography>
                <Typography variant="body2" component="p">
                    Due to the type of products offered, we do not accept
                    returns or exchanges. If there is an issue with your
                    purchase, please contact cedarhousecandles@gmail.com, and we
                    will be happy to help!
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Learn More</Button>
            </CardActions>
        </Card>
    );
}
