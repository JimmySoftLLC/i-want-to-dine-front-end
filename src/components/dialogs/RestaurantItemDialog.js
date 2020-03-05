import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import DataAndMethodsContext from '../../context/dataAndMethods/dataAndMethodsContext';
import Toolbar from '@material-ui/core/Toolbar';

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
        dataAndMethodsContext.setEditResturantOpen(false);
    };

    const handleSave = () => {
        switch (dataAndMethodsContext.editResturantValues.dialogType) {
            case "Edit":
                dataAndMethodsContext.saveResturant()
                break;
            case "Add":
                dataAndMethodsContext.saveResturantCopy()
                break;
            default:
        }
        dataAndMethodsContext.setEditResturantOpen(false);
    };

    const changeName = (e) => {
        dataAndMethodsContext.setResturantItem('name', e.target.value)
    };

    const changeDescription = (e) => {
        dataAndMethodsContext.setResturantItem('description', e.target.value)
    };

    const changeStreet = (e) => {
        dataAndMethodsContext.setResturantItem('street', e.target.value)
    };

    const changeCity = (e) => {
        dataAndMethodsContext.setResturantItem('city', e.target.value)
    };

    const changeState = (e) => {
        dataAndMethodsContext.setResturantItem('state', e.target.value)
    };

    const changeZipCode = (e) => {
        dataAndMethodsContext.setResturantItem('zipCode', e.target.value)
    };

    const changePhoneNumber = (e) => {
        dataAndMethodsContext.setResturantItem('phoneNumber', e.target.value)
    };

    const changeUrl = (e) => {
        dataAndMethodsContext.setResturantItem('url', e.target.value)
    };

    return (
        <div>
            <Dialog className={classes.root} open={dataAndMethodsContext.editResturantOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">
                    {dataAndMethodsContext.editResturantValues.dialogType + " resturant details"}</DialogTitle>
                <DialogContent>
                    <TextField
                        id="name"
                        label="Name"
                        type="text"
                        fullWidth
                        variant="filled"
                        size="small"
                        value={dataAndMethodsContext.editResturantValues.name}
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
                        value={dataAndMethodsContext.editResturantValues.description}
                        onChange={changeDescription}
                    />
                    <TextField
                        id="street"
                        label="Street Address"
                        type="text"
                        fullWidth
                        variant="filled"
                        size="small"
                        value={dataAndMethodsContext.editResturantValues.street}
                        onChange={changeStreet}
                    />
                    <TextField
                        id="city"
                        label="City"
                        type="text"
                        variant="filled"
                        size="small"
                        value={dataAndMethodsContext.editResturantValues.city}
                        onChange={changeCity}
                    />
                    <TextField
                        id="state"
                        label="State"
                        type="text"
                        variant="filled"
                        size="small"
                        value={dataAndMethodsContext.editResturantValues.state}
                        onChange={changeState}
                    />
                    <TextField
                        id="zipCode"
                        label="Zip code"
                        type="text"
                        variant="filled"
                        size="small"
                        value={dataAndMethodsContext.editResturantValues.zipCode}
                        onChange={changeZipCode}
                    />
                    <TextField
                        id="phone"
                        label="Phone Number xxx-xxx-xxxx"
                        type="text"
                        fullWidth
                        variant="filled"
                        value={dataAndMethodsContext.editResturantValues.phoneNumber}
                        onChange={changePhoneNumber}
                    />
                    <TextField
                        id="url"
                        label="Website Url"
                        type="text"
                        fullWidth
                        variant="filled"
                        value={dataAndMethodsContext.editResturantValues.url}
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
