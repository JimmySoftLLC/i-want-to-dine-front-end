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

    const { categoryJSON } = dataAndMethodsContext.editMenuItemValues;

    const handleClose = () => {
        dataAndMethodsContext.setEditMenuOpen(false);
    };

    const handleSave = () => {
        switch (dataAndMethodsContext.editMenuItemValues.menuDialogType) {
            case "Edit":
                dataAndMethodsContext.saveItem()
                break;
            case "Add":
                dataAndMethodsContext.saveItemCopy()
                break;
            default:
        }
        dataAndMethodsContext.setEditMenuOpen(false);
    };

    const changeTitle = (e) => {
        dataAndMethodsContext.setEditMenuItem('title', e.target.value)
    };

    const changeDescription = (e) => {
        dataAndMethodsContext.setEditMenuItem('description', e.target.value)
    };

    const changePrice = (e) => {
        dataAndMethodsContext.setEditMenuItem('price', e.target.value)
    };

    const checkIfPresent = (value) => {
        if (categoryJSON) {
            if (categoryJSON.indexOf(value) !== -1) { return true }
        }
        return false
    }

    return (
        <div>
            <Dialog className={classes.root} open={dataAndMethodsContext.editMenuOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">
                    {dataAndMethodsContext.editMenuItemValues.menuDialogType + " menu item"}</DialogTitle>
                <DialogContent>
                    <TextField
                        id="title"
                        label="Title"
                        type="text"
                        fullWidth
                        variant="filled"
                        size="small"
                        value={dataAndMethodsContext.editMenuItemValues.title}
                        onChange={changeTitle}
                    />
                    <TextField
                        id="description"
                        label="Description"
                        type="text"
                        fullWidth
                        variant="filled"
                        multiline={true}
                        rows="3"
                        value={dataAndMethodsContext.editMenuItemValues.description}
                        onChange={changeDescription}
                    />
                    <Toolbar>
                        <div >
                            <IconButton aria-label="" color={checkIfPresent("meat") ? "inherit" : "default"}
                                onClick={() => dataAndMethodsContext.setEditMenuItemCategory('meat')}
                            >
                                <i className='icon-tbone'></i>
                            </IconButton>
                            <IconButton aria-label="" color={checkIfPresent("poultry") ? "inherit" : "default"}
                                onClick={() => dataAndMethodsContext.setEditMenuItemCategory('poultry')}
                            >
                                <i className="fas fa-feather"></i>
                            </IconButton>
                            <IconButton aria-label="" color={checkIfPresent("pasta") ? "inherit" : "default"}
                                onClick={() => dataAndMethodsContext.setEditMenuItemCategory('pasta')}
                            >
                                <i className='icon-pasta'></i>
                            </IconButton>
                            <IconButton aria-label="" color={checkIfPresent("sandwich") ? "inherit" : "default"}
                                onClick={() => dataAndMethodsContext.setEditMenuItemCategory('sandwich')}
                            >
                                <i className='fas fa-hamburger'></i>
                            </IconButton>
                            <IconButton aria-label="" color={checkIfPresent("fish") ? "inherit" : "default"}
                                onClick={() => dataAndMethodsContext.setEditMenuItemCategory('fish')}
                            >
                                <i className='fas fa-fish'></i>
                            </IconButton>
                            <IconButton aria-label="" color={checkIfPresent("shellfish") ? "inherit" : "default"}
                                onClick={() => dataAndMethodsContext.setEditMenuItemCategory('shellfish')}
                            >
                                <i className='icon-shell'></i>
                            </IconButton>
                            <IconButton aria-label="" color={checkIfPresent("vegetarian") ? "inherit" : "default"}
                                onClick={() => dataAndMethodsContext.setEditMenuItemCategory('vegetarian')}
                            >
                                <i className='fas fa-seedling'></i>
                            </IconButton>
                            <IconButton aria-label="" color={checkIfPresent("dessert") ? "inherit" : "default"}
                                onClick={() => dataAndMethodsContext.setEditMenuItemCategory('dessert')}
                            >
                                <i className='icon-dessert'></i>
                            </IconButton>
                            <IconButton aria-label="" color={checkIfPresent("specials") ? "inherit" : "default"}
                                onClick={() => dataAndMethodsContext.setEditMenuItemCategory('specials')}
                            >
                                <i className="fas fa-tag"></i>
                            </IconButton>
                        </div>
                    </Toolbar>
                    <TextField
                        id="price"
                        label="Price"
                        type="number"
                        fullWidth
                        variant="filled"
                        value={dataAndMethodsContext.editMenuItemValues.price}
                        onChange={changePrice}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="default">
                        Cancel
                    </Button>
                    {/* <Button onClick={() => handleSave()} color="primary">
                        Save
                    </Button> */}
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default RestaurantItemDialog;
