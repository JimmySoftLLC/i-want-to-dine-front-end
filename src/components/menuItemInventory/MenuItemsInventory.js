import React, { useContext } from 'react';
import MenuItemCardInventory from './MenuItemCardInventory';
import DataAndMethodsContext from '../../context/dataAndMethods/dataAndMethodsContext';

const MenuItemsInventory = () => {
    const dataAndMethodsContext = useContext(DataAndMethodsContext);
    const {
        restaurantMenuItems,
        myStates,
        restaurants,
    } = dataAndMethodsContext;

    return restaurantMenuItems.map(menuItem => <MenuItemCardInventory menuItem={menuItem}
        myStates={myStates}
        restaurants={restaurants}
        key={menuItem.id} />);
};

export default MenuItemsInventory;