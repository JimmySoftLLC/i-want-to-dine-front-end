import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DataAndMethodsContext from '../../context/dataAndMethods/dataAndMethodsContext';
import getAssociatesRestaurants from '../../model/associate/getAssociatesRestaurants';
import putRestaurant from '../../model/restaurant/putRestaurant';
import putAssociate from '../../model/associate/putAssociate';
import sortRestaurants from '../../model/restaurant/sortRestaurants';

const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            marginLeft: 0,
        },
    },
}));

const RestaurantDialog = () => {
    const classes = useStyles();
    const dataAndMethodsContext = useContext(DataAndMethodsContext);

    const { setRestaurantDialogOpen,
        setRestaurantDialogDataItem,
        idToken,
        customId,
        setAssociate,
        setAssociatesRestaurants,
        restaurantDialogOpen,
    } = dataAndMethodsContext;

    const { id,
        restaurantName,
        description,
        street,
        city,
        stateUS,
        zipCode,
        phoneNumber,
        urlLink,
        orderUrlLink,
        facebookUrlLink,
        menuItemIdsJSON,
        entertainmentItemIdsJSON,
        associatesJSON,
        menuDayIdsJSON,
        photosJSON,
        approved,
        dialogType,
        myAssociate,
    } = dataAndMethodsContext.restaurantDialogData;

    const handleClose = () => {
        setRestaurantDialogOpen(false);
    };

    // save restaurant with data shown to database
    // if it is a new restaurant save data to the logged in associate also
    const saveRestaurant = async () => {
        let myRestaurant = {};
        myRestaurant.id = id;
        myRestaurant.restaurantName = restaurantName;
        myRestaurant.description = description;
        myRestaurant.street = street;
        myRestaurant.city = city;
        myRestaurant.stateUS = stateUS;
        myRestaurant.zipCode = zipCode;
        myRestaurant.phoneNumber = phoneNumber;
        myRestaurant.urlLink = urlLink;
        myRestaurant.orderUrlLink = orderUrlLink;
        myRestaurant.facebookUrlLink = facebookUrlLink;
        myRestaurant.menuItemIdsJSON = menuItemIdsJSON
        myRestaurant.entertainmentItemIdsJSON = entertainmentItemIdsJSON
        myRestaurant.associatesJSON = associatesJSON
        myRestaurant.photosJSON = photosJSON
        myRestaurant.menuDayIdsJSON = menuDayIdsJSON
        myRestaurant.photosJSON = photosJSON
        myRestaurant.approved = approved
        await putRestaurant(myRestaurant, idToken, customId)
        if (dialogType === 'New') {
            await putAssociate(myAssociate, idToken, customId)
            setAssociate(myAssociate)
        }
        let associatesRestaurants = await getAssociatesRestaurants(myAssociate)
        associatesRestaurants = await sortRestaurants(associatesRestaurants)
        setAssociatesRestaurants(associatesRestaurants);
        setRestaurantDialogOpen(false);
    };

    const changeName = (e) => {
        setRestaurantDialogDataItem('restaurantName', e.target.value)
    };

    const changeDescription = (e) => {
        setRestaurantDialogDataItem('description', e.target.value)
    };

    const changeStreet = (e) => {
        setRestaurantDialogDataItem('street', e.target.value)
    };

    const changeCity = (e) => {
        setRestaurantDialogDataItem('city', e.target.value)
    };

    const changeState = (e) => {
        setRestaurantDialogDataItem('stateUS', e.target.value)
    };

    const changeZipCode = (e) => {
        setRestaurantDialogDataItem('zipCode', e.target.value)
    };

    const changePhoneNumber = (e) => {
        setRestaurantDialogDataItem('phoneNumber', e.target.value)
    };

    const changeUrlLink = (e) => {
        setRestaurantDialogDataItem('urlLink', e.target.value)
    };

    const changeOrderUrlLink = (e) => {
        setRestaurantDialogDataItem('orderUrlLink', e.target.value)
    };

    const changeFacebookUrlLink = (e) => {
        setRestaurantDialogDataItem('facebookUrlLink', e.target.value)
    };

    return (
        <div>
            <Dialog className={classes.root} open={restaurantDialogOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">
                    {dialogType + " restaurant details"}</DialogTitle>
                <DialogContent>
                    <TextField
                        id="restaurantName"
                        label="Name"
                        type="text"
                        fullWidth
                        variant="filled"
                        size="small"
                        value={restaurantName}
                        onChange={changeName}
                    />
                    <TextField
                        id="description"
                        label="Description"
                        type="text"
                        fullWidth
                        variant="filled"
                        multiline={true}
                        rows="8"
                        value={description}
                        onChange={changeDescription}
                    />
                    <TextField
                        id="street"
                        label="Street Address"
                        type="text"
                        fullWidth
                        variant="filled"
                        size="small"
                        value={street}
                        onChange={changeStreet}
                    />
                    <TextField
                        id="city"
                        label="City"
                        type="text"
                        variant="filled"
                        size="small"
                        value={city}
                        onChange={changeCity}
                    />
                    <TextField
                        id="stateUS"
                        label="State"
                        type="text"
                        variant="filled"
                        size="small"
                        value={stateUS}
                        onChange={changeState}
                    />
                    <TextField
                        id="zipCode"
                        label="Zip code"
                        type="text"
                        variant="filled"
                        size="small"
                        value={zipCode}
                        onChange={changeZipCode}
                    />
                    <TextField
                        id="phone"
                        label="Phone Number xxx-xxx-xxxx"
                        type="text"
                        fullWidth
                        variant="filled"
                        value={phoneNumber}
                        onChange={changePhoneNumber}
                    />
                    <TextField
                        id="urlLink"
                        label="Website Url"
                        type="text"
                        fullWidth
                        variant="filled"
                        value={urlLink}
                        onChange={changeUrlLink}
                    />
                    <TextField
                        id="orderUrlLink"
                        label="Online Order Url"
                        type="text"
                        fullWidth
                        variant="filled"
                        value={orderUrlLink}
                        onChange={changeOrderUrlLink}
                    />
                    <TextField
                        id="facebookUrlLink"
                        label="Facebook Url"
                        type="text"
                        fullWidth
                        variant="filled"
                        value={facebookUrlLink}
                        onChange={changeFacebookUrlLink}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="default">
                        Cancel
                    </Button>
                    <Button onClick={() => saveRestaurant()} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default RestaurantDialog;
