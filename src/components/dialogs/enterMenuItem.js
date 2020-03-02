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

const EnterMenuItem = () => {
    const classes = useStyles();
    const dataAndMethodsContext = useContext(DataAndMethodsContext);

    const handleClose = () => {

        dataAndMethodsContext.setEditMenuOpen(false);
    };

    const handleSave = () => {
        dataAndMethodsContext.saveItem()
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

    return (
        <div>
            <Dialog className={classes.root} open={dataAndMethodsContext.editMenuOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add menu item</DialogTitle>
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
                            <IconButton aria-label="" color={dataAndMethodsContext.editMenuItemValues.category.indexOf("meat", 0) !== -1 ? "inherit" : "default"}
                                onClick={() => dataAndMethodsContext.setEditMenuItemCategory('meat')}
                            >
                                <i className='icon-steak'></i>
                            </IconButton>
                            <IconButton aria-label="" color={dataAndMethodsContext.editMenuItemValues.category.indexOf("poultry", 0) !== -1 ? "inherit" : "default"}
                                onClick={() => dataAndMethodsContext.setEditMenuItemCategory('poultry')}
                            >
                                <i className="fas fa-feather"></i>
                            </IconButton>
                            <IconButton aria-label="" color={dataAndMethodsContext.editMenuItemValues.category.indexOf("pasta", 0) !== -1 ? "inherit" : "default"}
                                onClick={() => dataAndMethodsContext.setEditMenuItemCategory('pasta')}
                            >
                                <i className='icon-pasta'></i>
                            </IconButton>
                            <IconButton aria-label="" color={dataAndMethodsContext.editMenuItemValues.category.indexOf("sandwich", 0) !== -1 ? "inherit" : "default"}
                                onClick={() => dataAndMethodsContext.setEditMenuItemCategory('sandwich')}
                            >
                                <i className='fas fa-hamburger'></i>
                            </IconButton>
                            <IconButton aria-label="" color={dataAndMethodsContext.editMenuItemValues.category.indexOf("fish", 0) !== -1 ? "inherit" : "default"}
                                onClick={() => dataAndMethodsContext.setEditMenuItemCategory('fish')}
                            >
                                <i className='fas fa-fish'></i>
                            </IconButton>
                            <IconButton aria-label="" color={dataAndMethodsContext.editMenuItemValues.category.indexOf("shellfish", 0) !== -1 ? "inherit" : "default"}
                                onClick={() => dataAndMethodsContext.setEditMenuItemCategory('shellfish')}
                            >
                                <i className='icon-shell'></i>
                            </IconButton>
                            <IconButton aria-label="" color={dataAndMethodsContext.editMenuItemValues.category.indexOf("vegetarian", 0) !== -1 ? "inherit" : "default"}
                                onClick={() => dataAndMethodsContext.setEditMenuItemCategory('vegetarian')}
                            >
                                <i className='fas fa-seedling'></i>
                            </IconButton>
                            <IconButton aria-label="" color={dataAndMethodsContext.editMenuItemValues.category.indexOf("dessert", 0) !== -1 ? "inherit" : "default"}
                                onClick={() => dataAndMethodsContext.setEditMenuItemCategory('dessert')}
                            >
                                <i className='fas fa-cheese'></i>
                            </IconButton>
                            <IconButton aria-label="" color={dataAndMethodsContext.editMenuItemValues.category.indexOf("specials", 0) !== -1 ? "inherit" : "default"}
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
                    <Button onClick={handleClose} color="primary">
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

export default EnterMenuItem;


