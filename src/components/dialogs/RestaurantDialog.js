import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DataAndMethodsContext from '../../context/dataAndMethods/dataAndMethodsContext';
import getAssociatesRestaurants from '../../model/getAssociatesRestaurants';
import putRestaurant from '../../model/putRestaurant';
import putAssociate from '../../model/putAssociate';
import {
    restaurantTableName,
    associatesTableName,
} from '../../api/apiConstants';

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
        restaurantDialogData,
        setRestaurantDialogDataItem,
        idToken,
        customId,
        setAssociate,
        setAssociatesRestaurants,
        restaurantDialogOpen,
    } = dataAndMethodsContext;

    const handleClose = () => {
        setRestaurantDialogOpen(false);
    };

    const saveRestaurant = async () => {
        let myRestaurant = {};
        myRestaurant.id = restaurantDialogData.id;
        myRestaurant.restaurantName = restaurantDialogData.restaurantName !== '' ? restaurantDialogData.restaurantName : String.fromCharCode(30);
        myRestaurant.description = restaurantDialogData.description !== '' ? restaurantDialogData.description : String.fromCharCode(30);
        myRestaurant.street = restaurantDialogData.street !== '' ? restaurantDialogData.street : String.fromCharCode(30);
        myRestaurant.city = restaurantDialogData.city !== '' ? restaurantDialogData.city : String.fromCharCode(30);
        myRestaurant.stateUS = restaurantDialogData.stateUS !== '' ? restaurantDialogData.stateUS : String.fromCharCode(30);
        myRestaurant.zipCode = restaurantDialogData.zipCode !== '' ? restaurantDialogData.zipCode : String.fromCharCode(30);
        myRestaurant.phoneNumber = restaurantDialogData.phoneNumber !== '' ? restaurantDialogData.phoneNumber : String.fromCharCode(30);
        myRestaurant.urlLink = restaurantDialogData.urlLink !== '' ? restaurantDialogData.urlLink : String.fromCharCode(30);
        myRestaurant.menuItemIdsJSON = restaurantDialogData.menuItemIdsJSON
        myRestaurant.associateIdsJSON = restaurantDialogData.associateIdsJSON
        myRestaurant.approved = restaurantDialogData.approved
        const successRestaurantPut = await putRestaurant(myRestaurant, idToken, customId)
        if (successRestaurantPut) {
            let myAssociate = JSON.parse(JSON.stringify(restaurantDialogData.myAssociate))
            const associateRestaurants = await getAssociatesRestaurants(myAssociate, idToken, customId)
            setAssociatesRestaurants(associateRestaurants);
            if (restaurantDialogData.dialogType === 'New') {
                await putAssociate(myAssociate, idToken, customId)
                setAssociate(myAssociate)
            }
        }
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

    return (
        <div>
            <Dialog className={classes.root} open={restaurantDialogOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">
                    {restaurantDialogData.dialogType + " restaurant details"}</DialogTitle>
                <DialogContent>
                    <TextField
                        id="restaurantName"
                        label="Name"
                        type="text"
                        fullWidth
                        variant="filled"
                        size="small"
                        value={restaurantDialogData.restaurantName}
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
                        value={restaurantDialogData.description}
                        onChange={changeDescription}
                    />
                    <TextField
                        id="street"
                        label="Street Address"
                        type="text"
                        fullWidth
                        variant="filled"
                        size="small"
                        value={restaurantDialogData.street}
                        onChange={changeStreet}
                    />
                    <TextField
                        id="city"
                        label="City"
                        type="text"
                        variant="filled"
                        size="small"
                        value={restaurantDialogData.city}
                        onChange={changeCity}
                    />
                    <TextField
                        id="stateUS"
                        label="State"
                        type="text"
                        variant="filled"
                        size="small"
                        value={restaurantDialogData.stateUS}
                        onChange={changeState}
                    />
                    <TextField
                        id="zipCode"
                        label="Zip code"
                        type="text"
                        variant="filled"
                        size="small"
                        value={restaurantDialogData.zipCode}
                        onChange={changeZipCode}
                    />
                    <TextField
                        id="phone"
                        label="Phone Number xxx-xxx-xxxx"
                        type="text"
                        fullWidth
                        variant="filled"
                        value={restaurantDialogData.phoneNumber}
                        onChange={changePhoneNumber}
                    />
                    <TextField
                        id="urlLink"
                        label="Website Url"
                        type="text"
                        fullWidth
                        variant="filled"
                        value={restaurantDialogData.urlLink}
                        onChange={changeUrlLink}
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
