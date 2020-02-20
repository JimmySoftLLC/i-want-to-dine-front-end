import React from 'react';

const MenuItemCard = ({ menuItem, myStates }) => {
    const items = []
    for (let i = 0; i < menuItem.category.length; i++) {
        switch (menuItem.category[i]) {
            case 'meat':
                items.push(<i className='icon-steak' key={menuItem.id + i * 100} style={{ paddingRight: '.25rem' }}></i>)
                break;
            case 'poultry':
                items.push(<i className='fas fa-feather' key={menuItem.id + i * 100} style={{ paddingRight: '.25rem' }}></i>)
                break;
            case 'pasta':
                items.push(<i className='icon-pasta' key={menuItem.id + i * 100} style={{ paddingRight: '.25rem' }}></i>)
                break;
            case 'sandwich':
                items.push(<i className='fas fa-hamburger' key={menuItem.id + i * 100} style={{ paddingRight: '.25rem' }}></i>)
                break;
            case 'fish':
                items.push(<i className='fas fa-fish' key={menuItem.id + i * 100} style={{ paddingRight: '.25rem' }}></i>)
                break;
            case 'shellfish':
                items.push(<i className='icon-shell' key={menuItem.id + i * 100} style={{ paddingRight: '.25rem' }}></i>)
                break;
            case 'vegetarian':
                items.push(<i className='fas fa-seedling' key={menuItem.id + i * 100} style={{ paddingRight: '.25rem' }}></i>)
                break;
            case 'dessert':
                items.push(<i className='fas fa-cheese' key={menuItem.id + i * 100} style={{ paddingRight: '.25rem' }}></i>)
                break;
            default:
        }
    }

    let showIt = false;
    for (let i = 0; i < menuItem.category.length; i++) {
        if (myStates[menuItem.category[i]]) {
            showIt = true;
            break
        }
    }

    const price = menuItem.price === 1000 ? 'MP' : menuItem.price;

    return (
        showIt && <div className='card'>
            <h3>{items}{menuItem.title}{' - '}{price}</h3>
            <h4>{menuItem.restaurant}</h4>
            <p>{menuItem.description}</p>
        </div>
    );
};

export default MenuItemCard;