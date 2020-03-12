import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DataAndMethodsContext from '../../context/dataAndMethods/dataAndMethodsContext';

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

    const handleClose = () => {
        dataAndMethodsContext.setEditRestaurantOpen(false);
    };

    const handleSave = () => {
        switch (dataAndMethodsContext.editRestaurantValues.dialogType) {
            case "Edit":
                dataAndMethodsContext.saveRestaurant()
                break;
            case "Add":
                dataAndMethodsContext.saveRestaurantCopy()
                break;
            default:
        }
        dataAndMethodsContext.setEditRestaurantOpen(false);
    };

    const changeName = (e) => {
        dataAndMethodsContext.setRestaurantItem('name', e.target.value)
    };

    const changeDescription = (e) => {
        dataAndMethodsContext.setRestaurantItem('description', e.target.value)
    };

    const changeStreet = (e) => {
        dataAndMethodsContext.setRestaurantItem('street', e.target.value)
    };

    const changeCity = (e) => {
        dataAndMethodsContext.setRestaurantItem('city', e.target.value)
    };

    const changeState = (e) => {
        dataAndMethodsContext.setRestaurantItem('state', e.target.value)
    };

    const changeZipCode = (e) => {
        dataAndMethodsContext.setRestaurantItem('zipCode', e.target.value)
    };

    const changePhoneNumber = (e) => {
        dataAndMethodsContext.setRestaurantItem('phoneNumber', e.target.value)
    };

    const changeUrl = (e) => {
        dataAndMethodsContext.setRestaurantItem('url', e.target.value)
    };

    return (
        <div>
            <Dialog className={classes.root} open={dataAndMethodsContext.editRestaurantOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">
                    {dataAndMethodsContext.editRestaurantValues.dialogType + " Restaurant details"}</DialogTitle>
                <DialogContent>
                    <TextField
                        id="name"
                        label="Name"
                        type="text"
                        fullWidth
                        variant="filled"
                        size="small"
                        value={dataAndMethodsContext.editRestaurantValues.name}
                        onChange={changeName}
                    />
                    <TextField
                        id="description"
                        label="Description"
                        type="text"
                        fullWidth
                        variant="filled"
                        multiline={true}
                        rows="3"
                        value={dataAndMethodsContext.editRestaurantValues.description}
                        onChange={changeDescription}
                    />
                    <TextField
                        id="street"
                        label="Street Address"
                        type="text"
                        fullWidth
                        variant="filled"
                        size="small"
                        value={dataAndMethodsContext.editRestaurantValues.street}
                        onChange={changeStreet}
                    />
                    <TextField
                        id="city"
                        label="City"
                        type="text"
                        variant="filled"
                        size="small"
                        value={dataAndMethodsContext.editRestaurantValues.city}
                        onChange={changeCity}
                    />
                    <TextField
                        id="state"
                        label="State"
                        type="text"
                        variant="filled"
                        size="small"
                        value={dataAndMethodsContext.editRestaurantValues.state}
                        onChange={changeState}
                    />
                    <TextField
                        id="zipCode"
                        label="Zip code"
                        type="text"
                        variant="filled"
                        size="small"
                        value={dataAndMethodsContext.editRestaurantValues.zipCode}
                        onChange={changeZipCode}
                    />
                    <TextField
                        id="phone"
                        label="Phone Number xxx-xxx-xxxx"
                        type="text"
                        fullWidth
                        variant="filled"
                        value={dataAndMethodsContext.editRestaurantValues.phoneNumber}
                        onChange={changePhoneNumber}
                    />
                    <TextField
                        id="url"
                        label="Website Url"
                        type="text"
                        fullWidth
                        variant="filled"
                        value={dataAndMethodsContext.editRestaurantValues.url}
                        onChange={changeUrl}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="default">
                        Cancel
                    </Button>
                    <Button onClick={() => handleSave()} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default RestaurantItemDialog;
