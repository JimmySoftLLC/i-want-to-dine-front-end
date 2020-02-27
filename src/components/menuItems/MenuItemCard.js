import React from 'react';

const MenuItemCard = ({ menuItem, myStates }) => {
    const items = []
    for (const myKey in menuItem.category.contents) {
        switch (myKey) {
            case 'meat':
                items.push(<i className='icon-steak' key={menuItem.id + "_poultry"} style={{ paddingRight: '.25rem' }}></i>)
                break;
            case 'poultry':
                items.push(<i className='fas fa-feather' key={menuItem.id + "_feather"} style={{ paddingRight: '.25rem' }}></i>)
                break;
            case 'pasta':
                items.push(<i className='icon-pasta' key={menuItem.id + "_pasta"} style={{ paddingRight: '.25rem' }}></i>)
                break;
            case 'sandwich':
                items.push(<i className='fas fa-hamburger' key={menuItem.id + "_hamburger"} style={{ paddingRight: '.25rem' }}></i>)
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
            case 'dessert':
                items.push(<i className='fas fa-cheese' key={menuItem.id + "_cheese"} style={{ paddingRight: '.25rem' }}></i>)
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
        for (const myKey in menuItem.category.contents) {
            if (myStates[myKey]) {
                showIt = true;
                break
            }
        }
        price = menuItem.price === 1000 ? 'MP' : menuItem.price;
    }


    return (
        showIt && <div className='card'>
            <h3>{items}{menuItem.title}{' - '}{price}</h3>
            <h4>{menuItem.restaurant}</h4>
            <p>{menuItem.description}</p>
        </div>
    );
};

export default MenuItemCard;