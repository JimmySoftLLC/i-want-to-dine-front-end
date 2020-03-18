import React from 'react';
// import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiButton-root': {
            margin: theme.spacing(1),
            marginLeft: 0,
        },

    },
}));

const MenuItemCard = ({ menuItem, myStates, restaurants, handleClickMenuItemEdit, handleClickMenuItemCopy, handleClickMenuItemDelete }) => {
    const classes = useStyles();
    const items = []
    for (let i = 0; i < menuItem.categoryJSON.length; i++) {
        switch (menuItem.categoryJSON[i]) {
            case 'meat':
                items.push(<i className='icon-tbone' key={menuItem.id + "_meat"} style={{ paddingRight: '.25rem' }}></i>)
                break;
            case 'pork':
                items.push(<i className='icon-ham' key={menuItem.id + "_pork"} style={{ paddingRight: '.25rem' }}></i>)
                break;
            case 'lamb':
                items.push(<i className='icon-lamb' key={menuItem.id + "_lamb"} style={{ paddingRight: '.25rem' }}></i>)
                break;
            case 'poultry':
                items.push(<i className='fas fa-feather' key={menuItem.id + "_feather"} style={{ paddingRight: '.25rem' }}></i>)
                break;
            case 'fish':
                items.push(<i className='fas fa-fish' key={menuItem.id + "_fish"} style={{ paddingRight: '.25rem' }}></i>)
                break;
            case 'shellfish':
                items.push(<i className='icon-shell' key={menuItem.id + "_shell"} style={{ paddingRight: '.25rem' }}></i>)
                break;
            case 'vegetarian':
                items.push(<i className='fas fa-seedling' key={menuItem.id + "_seedling"} style={{ paddingRight: '.25rem' }}></i>)
                break;
            case 'cheese':
                items.push(<i className='fas fa-cheese' key={menuItem.id + "_cheese"} style={{ paddingRight: '.25rem' }}></i>)
                break;
            case 'pasta':
                items.push(<i className='icon-spaghetti' key={menuItem.id + "_pasta"} style={{ paddingRight: '.25rem' }}></i>)
                break;
            case 'sandwich':
                items.push(<i className='fas fa-hamburger' key={menuItem.id + "_hamburger"} style={{ paddingRight: '.25rem' }}></i>)
                break;
            case 'dessert':
                items.push(<i className='fas fa-birthday-cake' key={menuItem.id + "_dessert"} style={{ paddingRight: '.25rem' }}></i>)
                break;
            case 'specials':
                items.push(<i className='fas fa-tag' key={menuItem.id + "_specials"} style={{ paddingRight: '.25rem' }}></i>)
                break;
            default:
        }
    }

    let showIt = false;
    let inPriceRange = false;
    let price = '';

    if (myStates.dollar_1 && menuItem.price > 0 && menuItem.price <= 20) { inPriceRange = true }
    if (myStates.dollar_2 && menuItem.price > 20 && menuItem.price <= 35) { inPriceRange = true }
    if (myStates.dollar_3 && menuItem.price > 35) { inPriceRange = true }

    if (inPriceRange) {
        for (let i = 0; i < menuItem.categoryJSON.length; i++) {
            if (myStates[menuItem.categoryJSON[i]]) {
                showIt = true;
                break
            }
        }
        price = menuItem.price >= 1000 ? 'MP' : menuItem.price;
    }

    let myUrlLink = ""
    for (let i = 0; i < restaurants.length; i++) {
        if (restaurants[i].restaurantName === menuItem.restaurant) {
            if (!restaurants[i].approved) { showIt = false };
            myUrlLink = restaurants[i].urlLink
            break;
        }
    }

    return (
        showIt && <div className='card'>
            <h3>{items}{menuItem.title}{' - '}{price}
            </h3>
            <a href={myUrlLink} rel="noopener noreferrer" target="_blank">{menuItem.restaurant}</a>
            <div className={classes.root} >
                {/* <Button variant="outlined" color="primary" onClick={() => handleClickMenuItemEdit(menuItem.id)}>
                    <i className="fas fa-edit"></i>
                </Button>
                <Button variant="outlined" color="primary" onClick={() => handleClickMenuItemCopy(menuItem.id)}>
                    <i className="fas fa-copy"></i>
                </Button>
                <Button variant="outlined" color="primary" onClick={() => handleClickMenuItemDelete(menuItem.id)}>
                    <i className="fas fa-trash"></i>
                </Button> */}
            </div>
            <p>{menuItem.description}</p>
        </div>
    );
};

export default MenuItemCard;