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
import { Tooltip } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            marginLeft: 0,
        },
    },
}));

const MenuItemDialog = () => {
    const classes = useStyles();
    const dataAndMethodsContext = useContext(DataAndMethodsContext);

    const { categoryJSON } = dataAndMethodsContext.editMenuItemValues;

    const handleClose = () => {
        dataAndMethodsContext.setEditMenuOpen(false);
    };

    const handleSave = () => {
        switch (dataAndMethodsContext.editMenuItemValues.dialogType) {
            case "Edit":
                dataAndMethodsContext.saveMenuItem()
                break;
            case "Add":
                dataAndMethodsContext.saveMenuItemCopy()
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

    const changeRestaurant = (e) => {
        dataAndMethodsContext.setEditMenuItem('restaurant', e.target.value)
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
                    {dataAndMethodsContext.editMenuItemValues.dialogType + " menu item"}</DialogTitle>
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
                    <TextField
                        id="restaurant"
                        label="Restaurant"
                        type="text"
                        fullWidth
                        variant="filled"
                        size="small"
                        value={dataAndMethodsContext.editMenuItemValues.restaurant}
                        onChange={changeRestaurant}
                    />
                    <Toolbar>
                        <div >
                            <Tooltip title="Beef and other">
                                <IconButton aria-label="" color={checkIfPresent("meat") ? "inherit" : "default"}
                                    onClick={() => dataAndMethodsContext.setEditMenuItemCategory('meat')}
                                >
                                    <i className='icon-tbone'></i>
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Pork">
                                <IconButton aria-label="" color={checkIfPresent("pork") ? "inherit" : "default"}
                                    onClick={() => dataAndMethodsContext.setEditMenuItemCategory('pork')}
                                >
                                    <i className='icon-ham'></i>
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Lamb">
                                <IconButton aria-label="" color={checkIfPresent("lamb") ? "inherit" : "default"}
                                    onClick={() => dataAndMethodsContext.setEditMenuItemCategory('lamb')}
                                >
                                    <i className='icon-lamb'></i>
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Poultry">
                                <IconButton aria-label="" color={checkIfPresent("poultry") ? "inherit" : "default"}
                                    onClick={() => dataAndMethodsContext.setEditMenuItemCategory('poultry')}
                                >
                                    <i className="fas fa-feather"></i>
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Fish">
                                <IconButton aria-label="" color={checkIfPresent("fish") ? "inherit" : "default"}
                                    onClick={() => dataAndMethodsContext.setEditMenuItemCategory('fish')}
                                >
                                    <i className='fas fa-fish'></i>
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Shellfish">
                                <IconButton aria-label="" color={checkIfPresent("shellfish") ? "inherit" : "default"}
                                    onClick={() => dataAndMethodsContext.setEditMenuItemCategory('shellfish')}
                                >
                                    <i className='icon-shell'></i>
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Vegetarian">
                                <IconButton aria-label="" color={checkIfPresent("vegetarian") ? "inherit" : "default"}
                                    onClick={() => dataAndMethodsContext.setEditMenuItemCategory('vegetarian')}
                                >
                                    <i className='fas fa-seedling'></i>
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Cheese">
                                <IconButton aria-label="" color={checkIfPresent("cheese") ? "inherit" : "default"}
                                    onClick={() => dataAndMethodsContext.setEditMenuItemCategory('cheese')}
                                >
                                    <i className='fas fa-cheese'></i>
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Pasta">
                                <IconButton aria-label="" color={checkIfPresent("pasta") ? "inherit" : "default"}
                                    onClick={() => dataAndMethodsContext.setEditMenuItemCategory('pasta')}
                                >
                                    <i className='icon-pasta'></i>
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Sandwiches">
                                <IconButton aria-label="" color={checkIfPresent("sandwich") ? "inherit" : "default"}
                                    onClick={() => dataAndMethodsContext.setEditMenuItemCategory('sandwich')}
                                >
                                    <i className='fas fa-hamburger'></i>
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Dessert">
                                <IconButton aria-label="" color={checkIfPresent("dessert") ? "inherit" : "default"}
                                    onClick={() => dataAndMethodsContext.setEditMenuItemCategory('dessert')}
                                >
                                    <i className="fas fa-birthday-cake"></i>
                                </IconButton>
                            </Tooltip>

                            <Tooltip title="Specials">
                                <IconButton aria-label="" color={checkIfPresent("specials") ? "inherit" : "default"}
                                    onClick={() => dataAndMethodsContext.setEditMenuItemCategory('specials')}
                                >
                                    <i className="fas fa-tag"></i>
                                </IconButton>
                            </Tooltip>

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
                    <Button onClick={() => handleSave()} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default MenuItemDialog;


