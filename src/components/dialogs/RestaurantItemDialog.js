import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DataAndMethodsContext from '../../context/dataAndMethods/dataAndMethodsContext';
import putItemDynamoDB from '../../api/putItemDynamoDB';
import getAssociatesRestaurants from '../../model/getAssociatesRestaurants';
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

const RestaurantItemDialog = () => {
    const classes = useStyles();
    const dataAndMethodsContext = useContext(DataAndMethodsContext);

    const { setEditRestaurantOpen,
        editRestaurantValues,
        setRestaurantItem,
        idToken,
        customId,
        setAssociate,
        setAssociateRestaurants,
        editRestaurantOpen,
    } = dataAndMethodsContext;

    const handleClose = () => {
        setEditRestaurantOpen(false);
    };

    const saveRestaurant = async () => {
        let myRestaurant = {};
        myRestaurant.id = editRestaurantValues.id;
        myRestaurant.restaurantName = editRestaurantValues.restaurantName !== '' ? editRestaurantValues.restaurantName : String.fromCharCode(30);
        myRestaurant.description = editRestaurantValues.description !== '' ? editRestaurantValues.description : String.fromCharCode(30);
        myRestaurant.street = editRestaurantValues.street !== '' ? editRestaurantValues.street : String.fromCharCode(30);
        myRestaurant.city = editRestaurantValues.city !== '' ? editRestaurantValues.city : String.fromCharCode(30);
        myRestaurant.stateUS = editRestaurantValues.stateUS !== '' ? editRestaurantValues.stateUS : String.fromCharCode(30);
        myRestaurant.zipCode = editRestaurantValues.zipCode !== '' ? editRestaurantValues.zipCode : String.fromCharCode(30);
        myRestaurant.phoneNumber = editRestaurantValues.phoneNumber !== '' ? editRestaurantValues.phoneNumber : String.fromCharCode(30);
        myRestaurant.urlLink = editRestaurantValues.urlLink !== '' ? editRestaurantValues.urlLink : String.fromCharCode(30);
        myRestaurant.menuItemIdsJSON = editRestaurantValues.menuItemIdsJSON
        myRestaurant.associateIdsJSON = editRestaurantValues.associateIdsJSON
        myRestaurant.approved = editRestaurantValues.approved
        const successRestaurantPut = await putItemDynamoDB(restaurantTableName, idToken, myRestaurant, customId)
        if (successRestaurantPut) {
            let myAssociate = JSON.parse(JSON.stringify(editRestaurantValues.myAssociate))
            const associateRestaurants = await getAssociatesRestaurants(myAssociate, idToken, customId)
            setAssociateRestaurants(associateRestaurants);
            if (editRestaurantValues.dialogType === 'New') {
                const successAssociatePut = await putItemDynamoDB(associatesTableName, idToken, myAssociate, customId)
                setAssociate(myAssociate)
            }
        }
        setEditRestaurantOpen(false);
    };

    const deleteRestaurant = (RestaurantId) => {
        // let myNewRestaurants = JSON.parse(JSON.stringify(state.restaurants))
        // for (let i = 0; 1 < myNewRestaurants.length; i++) {
        //     if (RestaurantId === myNewRestaurants[i].id) {
        //         //deleteItemDynamoDB(restaurantTableName, myNewRestaurants[i]);
        //         myNewRestaurants.splice(i, 1);
        //         break;
        //     }
        // }
    };

    const changeName = (e) => {
        setRestaurantItem('restaurantName', e.target.value)
    };

    const changeDescription = (e) => {
        setRestaurantItem('description', e.target.value)
    };

    const changeStreet = (e) => {
        setRestaurantItem('street', e.target.value)
    };

    const changeCity = (e) => {
        setRestaurantItem('city', e.target.value)
    };

    const changeState = (e) => {
        setRestaurantItem('stateUS', e.target.value)
    };

    const changeZipCode = (e) => {
        setRestaurantItem('zipCode', e.target.value)
    };

    const changePhoneNumber = (e) => {
        setRestaurantItem('phoneNumber', e.target.value)
    };

    const changeUrlLink = (e) => {
        setRestaurantItem('urlLink', e.target.value)
    };

    return (
        <div>
            <Dialog className={classes.root} open={editRestaurantOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">
                    {editRestaurantValues.dialogType + " restaurant details"}</DialogTitle>
                <DialogContent>
                    <TextField
                        id="restaurantName"
                        label="Name"
                        type="text"
                        fullWidth
                        variant="filled"
                        size="small"
                        value={editRestaurantValues.restaurantName}
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
                        value={editRestaurantValues.description}
                        onChange={changeDescription}
                    />
                    <TextField
                        id="street"
                        label="Street Address"
                        type="text"
                        fullWidth
                        variant="filled"
                        size="small"
                        value={editRestaurantValues.street}
                        onChange={changeStreet}
                    />
                    <TextField
                        id="city"
                        label="City"
                        type="text"
                        variant="filled"
                        size="small"
                        value={editRestaurantValues.city}
                        onChange={changeCity}
                    />
                    <TextField
                        id="stateUS"
                        label="State"
                        type="text"
                        variant="filled"
                        size="small"
                        value={editRestaurantValues.stateUS}
                        onChange={changeState}
                    />
                    <TextField
                        id="zipCode"
                        label="Zip code"
                        type="text"
                        variant="filled"
                        size="small"
                        value={editRestaurantValues.zipCode}
                        onChange={changeZipCode}
                    />
                    <TextField
                        id="phone"
                        label="Phone Number xxx-xxx-xxxx"
                        type="text"
                        fullWidth
                        variant="filled"
                        value={editRestaurantValues.phoneNumber}
                        onChange={changePhoneNumber}
                    />
                    <TextField
                        id="urlLink"
                        label="Website Url"
                        type="text"
                        fullWidth
                        variant="filled"
                        value={editRestaurantValues.urlLink}
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

export default RestaurantItemDialog;
