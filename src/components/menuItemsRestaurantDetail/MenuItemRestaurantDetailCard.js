import React from 'react';

const MenuItemRestaurantDetailCard = ({ menuItem }) => {
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

    let price = '';

    price = menuItem.price >= 1000 ? 'MP' : menuItem.price;

    return (
        <div className='card'>
            <h3>{items}{menuItem.title}{' - '}{price}
            </h3>
            <p>{menuItem.description}</p>
        </div>
    );
};

export default MenuItemRestaurantDetailCard;
