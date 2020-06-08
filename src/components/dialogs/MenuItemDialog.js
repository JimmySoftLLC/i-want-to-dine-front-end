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
import putMenuItem from '../../model/menuItem/putMenuItem';
import getRestaurantById from '../../model/restaurant/getRestaurantById';
import putRestaurant from '../../model/restaurant/putRestaurant';
import sortMenuItems from '../../model/menuItem/sortMenuItems';
import getMenuItems from '../../model/menuItem/getMenuItems';

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

    const {
        id,
        title,
        description,
        categoryJSON,
        restaurant,
        price,
        dialogType,
    } = dataAndMethodsContext.menuItemDialogData;

    const {
        menuItemDialogOpen,
        setMenuItemDialogDataCategory,
        setMenuItemDialogOpen,
        setMenuItemDialogDataItem,
        idToken,
        customId,
        setRestaurantMenuItems,
        associatesRestaurants,
        restaurantId,
        myStates,
        setMenuItemDialogData,
    } = dataAndMethodsContext;

    const handleClose = () => {
        setMenuItemDialogOpen(false);
    };

    const handleSave = () => {
        switch (dialogType) {
            case "Edit":
                saveMenuItem()
                break;
            case "Add":
                saveMenuItemAdd()
                break;
            default:
        }
        setMenuItemDialogOpen(false);
    };

    const saveMenuItem = async () => {
        let myNewMenuItem = {}
        myNewMenuItem.id = id;
        myNewMenuItem.title = title;
        myNewMenuItem.description = description;
        myNewMenuItem.categoryJSON = categoryJSON;
        myNewMenuItem.restaurant = restaurant;
        myNewMenuItem.restaurantId = restaurantId;
        myNewMenuItem.price = price;
        //console.log(menuItemsTableName, idToken, myNewMenuItem, customId);
        await putMenuItem(myNewMenuItem, idToken, customId);
        let myRestaurant = getRestaurantById(associatesRestaurants, restaurantId);
        let myMenuItems = await getMenuItems(myRestaurant.menuItemIdsJSON);
        myMenuItems = await sortMenuItems(myMenuItems, myStates);
        setRestaurantMenuItems(myMenuItems)
    };

    const saveMenuItemAdd = async () => {
        let myNewMenuItem = {}
        myNewMenuItem.id = id;
        myNewMenuItem.title = title;
        myNewMenuItem.description = description;
        myNewMenuItem.categoryJSON = categoryJSON;
        myNewMenuItem.restaurant = restaurant;
        myNewMenuItem.restaurantId = restaurantId;
        myNewMenuItem.price = price;
        //console.log(menuItemsTableName, idToken, myNewMenuItem, customId);
        await putMenuItem(myNewMenuItem, idToken, customId);
        let myRestaurant = getRestaurantById(associatesRestaurants, restaurantId);
        myRestaurant.menuItemIdsJSON.push(myNewMenuItem.id);
        await putRestaurant(myRestaurant, idToken, customId);
        let myMenuItems = await getMenuItems(myRestaurant.menuItemIdsJSON);
        myMenuItems = await sortMenuItems(myMenuItems, myStates);
        setRestaurantMenuItems(myMenuItems)
    };

    const changeTitle = (e) => {
        setMenuItemDialogDataItem('title', e.target.value)
    };

    const changeDescription = (e) => {
        setMenuItemDialogDataItem('description', e.target.value)
    };

    const changePrice = (e) => {
        setMenuItemDialogDataItem('price', e.target.value)
    };

    const handleLowerCase = (e) => {
        let myMenuItemDialogData = JSON.parse(JSON.stringify(dataAndMethodsContext.menuItemDialogData))
        myMenuItemDialogData.title = myMenuItemDialogData.title.toLowerCase()
        myMenuItemDialogData.description = myMenuItemDialogData.description.toLowerCase()
        setMenuItemDialogData(myMenuItemDialogData)
    };

    const checkIfPresent = (value) => {
        if (categoryJSON) {
            if (categoryJSON.indexOf(value) !== -1) { return true }
        }
        return false
    }

    return (
        <div>
            <Dialog className={classes.root} open={menuItemDialogOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">
                    {dialogType + " menu item"}</DialogTitle>
                <DialogContent>
                    <TextField
                        id="title"
                        label="Title"
                        type="text"
                        fullWidth
                        variant="filled"
                        size="small"
                        value={title}
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
                        value={description}
                        onChange={changeDescription}
                    />
                    <p>Menu Category</p>
                    <Toolbar>
                        <div >
                            <Tooltip title="Daily specials">
                                <IconButton aria-label="" color={checkIfPresent('specials') ? "inherit" : "default"}
                                    onClick={() => setMenuItemDialogDataCategory('specials')}
                                >
                                    <i className="fas fa-tag"></i>
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Soup">
                                <IconButton aria-label="" color={checkIfPresent('soup') ? "inherit" : "default"}
                                    onClick={() => setMenuItemDialogDataCategory('soup')}
                                >
                                    <i className="icon-soup"></i>
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Salad">
                                <IconButton aria-label="" color={checkIfPresent('salad') ? "inherit" : "default"}
                                    onClick={() => setMenuItemDialogDataCategory('salad')}
                                >
                                    <i className="icon-salad"></i>
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Appetizers">
                                <IconButton aria-label="" color={checkIfPresent('appetizers') ? "inherit" : "default"}
                                    onClick={() => setMenuItemDialogDataCategory('appetizers')}
                                >
                                    <i className="icon-appetizer"></i>
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Sandwiches">
                                <IconButton aria-label="" color={checkIfPresent('sandwich') ? "inherit" : "default"}
                                    onClick={() => setMenuItemDialogDataCategory('sandwich')}
                                >
                                    <i className='fas fa-hamburger'></i>
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Pizza">
                                <IconButton aria-label="" color={checkIfPresent('pizza') ? "inherit" : "default"}
                                    onClick={() => setMenuItemDialogDataCategory('pizza')}
                                >
                                    <i className="fas fa-pizza-slice"></i>
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Pasta">
                                <IconButton aria-label="" color={checkIfPresent('pasta') ? "inherit" : "default"}
                                    onClick={() => setMenuItemDialogDataCategory('pasta')}
                                >
                                    <i className='icon-spaghetti'></i>
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Entrees">
                                <IconButton aria-label="" color={checkIfPresent('entree') ? "inherit" : "default"}
                                    onClick={() => setMenuItemDialogDataCategory('entree')}
                                >
                                    <i className="fas fa-concierge-bell"></i>
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Dessert">
                                <IconButton aria-label="" color={checkIfPresent('dessert') ? "inherit" : "default"}
                                    onClick={() => setMenuItemDialogDataCategory('dessert')}
                                >
                                    <i className="fas fa-birthday-cake"></i>
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Drinks">
                                <IconButton aria-label="" color={checkIfPresent('drinks') ? "inherit" : "default"}
                                    onClick={() => setMenuItemDialogDataCategory('drinks')}
                                >
                                    <i className="fas fa-cocktail"></i>
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Kids menu">
                                <IconButton aria-label="" color={checkIfPresent('kids') ? "inherit" : "default"}
                                    onClick={() => setMenuItemDialogDataCategory('kids')}
                                >
                                    <i className="fas fa-child"></i>
                                </IconButton>
                            </Tooltip>
                        </div>
                    </Toolbar>
                    <p>Ingredients</p>
                    <Toolbar>
                        <div >
                            <Tooltip title="Beef and other">
                                <IconButton aria-label="" color={checkIfPresent("meat") ? "inherit" : "default"}
                                    onClick={() => setMenuItemDialogDataCategory('meat')}
                                >
                                    <i className='icon-tbone'></i>
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Pork">
                                <IconButton aria-label="" color={checkIfPresent("pork") ? "inherit" : "default"}
                                    onClick={() => setMenuItemDialogDataCategory('pork')}
                                >
                                    <i className='icon-ham'></i>
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Poultry">
                                <IconButton aria-label="" color={checkIfPresent("poultry") ? "inherit" : "default"}
                                    onClick={() => setMenuItemDialogDataCategory('poultry')}
                                >
                                    <i className="fas fa-feather"></i>
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Fish">
                                <IconButton aria-label="" color={checkIfPresent("fish") ? "inherit" : "default"}
                                    onClick={() => setMenuItemDialogDataCategory('fish')}
                                >
                                    <i className='fas fa-fish'></i>
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Shellfish">
                                <IconButton aria-label="" color={checkIfPresent("shellfish") ? "inherit" : "default"}
                                    onClick={() => setMenuItemDialogDataCategory('shellfish')}
                                >
                                    <i className='icon-shell'></i>
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Vegetarian">
                                <IconButton aria-label="" color={checkIfPresent("vegetarian") ? "inherit" : "default"}
                                    onClick={() => setMenuItemDialogDataCategory('vegetarian')}
                                >
                                    <i className='fas fa-seedling'></i>
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Cheese">
                                <IconButton aria-label="" color={checkIfPresent("cheese") ? "inherit" : "default"}
                                    onClick={() => setMenuItemDialogDataCategory('cheese')}
                                >
                                    <i className='fas fa-cheese'></i>
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Carryout">
                                <IconButton aria-label="" color={checkIfPresent("carryout") ? "inherit" : "default"}
                                    onClick={() => setMenuItemDialogDataCategory('carryout')}
                                >
                                    <i className="fas fa-shopping-bag"></i>
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
                        value={price}
                        onChange={changePrice}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleLowerCase} color="default">
                        Lowercase
                    </Button>
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


