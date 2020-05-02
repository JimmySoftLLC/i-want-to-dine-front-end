import React, { useContext } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
import DataAndMethodsContext from '../../context/dataAndMethods/dataAndMethodsContext';
import getRestaurantByName from '../../model/restaurant/getRestaurantByName';
import getMenuItemsForRestaurant from '../../model/menuItem/getMenuItemsForRestaurant';
import getAssociatesForRestaurant from '../../model/associate/getAssociatesForRestaurant';
import MultipleParagraphs from '../multipleParagraphs/MultipleParagraphs';

const MenuItemCardPublicFacing = ({ menuItem, myStates, restaurants }) => {
    const dataAndMethodsContext = useContext(DataAndMethodsContext);
    const {
        setRestaurantDetail,
        setMyState,
        menuItems,
        associates,
        menuDays,
    } = dataAndMethodsContext;
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
            case 'carryout':
                items.push(<i className='fas fa-shopping-bag' key={menuItem.id + "_carryout"} style={{ paddingRight: '.25rem' }}></i>)
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

    let myRestaurant = getRestaurantByName(restaurants, menuItem.restaurant)
    if (!myRestaurant.approved) { showIt = false };
    let myPhoneLink = "tel:" + myRestaurant.phoneNumber
    let myPhoneNumber = myRestaurant.phoneNumber

    var myStyle = {
        marginLeft: '1rem',
    };

    const restaurantClick = () => {
        myRestaurant.menuItems = getMenuItemsForRestaurant(myRestaurant, menuItems)
        myRestaurant.associates = getAssociatesForRestaurant(myRestaurant, associates)
        myRestaurant.menuDays = menuDays;
        setRestaurantDetail(myRestaurant);
        setMyState('restaurantDetail')
    }

    return (
        showIt && <div className='card'>
            <h3>{items}{menuItem.title}{' - '}{price}
            </h3>
            <Link onClick={() => restaurantClick()}>{menuItem.restaurant}</Link>
            <span style={myStyle}>{myPhoneNumber}
                <IconButton aria-label=""
                    href={myPhoneLink}
                    color={"primary"}>
                    <i className="fas fa-phone"></i>
                </IconButton></span>
            <MultipleParagraphs myText={menuItem.description} />
        </div>
    );
};

export default MenuItemCardPublicFacing;
