import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiButton-root': {
            margin: theme.spacing(1),
            marginLeft: 0,
        },

    },
}));

const RestaurantItemCard = ({ restuarantItem, myStates, handleClickRestaurantEdit, handleClickRestaurantCopy, handleClickRestaurantDelete }) => {
    const classes = useStyles();
    let showIt = myStates['restuarant']
    let myPhoneLink = "tel:" + restuarantItem.phoneNumber
    return (
        showIt && <div className='card'>
            <h3>{restuarantItem.name}
                <IconButton aria-label=""
                    href={restuarantItem.url}
                    rel="noopener noreferrer" target="_blank"
                    color={"primary"}>
                    <i className="fas fa-external-link-alt"></i>
                </IconButton>
            </h3>
            <h4>{restuarantItem.street}{' - '}{restuarantItem.city}</h4>
            <h4 href={myPhoneLink}>{restuarantItem.phoneNumber}
                <IconButton aria-label=""
                    href={myPhoneLink}
                    color={"primary"}>
                    <i className="fas fa-phone"></i>
                </IconButton></h4>
            <p>{restuarantItem.description}</p>
            <div className={classes.root} >
                {/* <Button variant="outlined" color="primary" onClick={() => handleClickRestaurantEdit(restuarantItem.id)}>
                    <i className="fas fa-edit"></i>
                </Button>
                <Button variant="outlined" color="primary" onClick={() => handleClickRestaurantCopy(restuarantItem.id)}>
                    <i className="fas fa-copy"></i>
                </Button>
                <Button variant="outlined" color="primary" onClick={() => handleClickRestaurantDelete(restuarantItem.id)}>
                    <i className="fas fa-trash"></i>
                </Button> */}
            </div>
        </div>
    );
};

export default RestaurantItemCard;