import React, { useContext } from 'react';
import MenuItemCardInventory from './MenuItemCardInventory';
import DataAndMethodsContext from '../../context/dataAndMethods/dataAndMethodsContext';

const MenuItemsInventory = () => {
    const dataAndMethodsContext = useContext(DataAndMethodsContext);
    const {
        restaurantMenuItems,
        myStates,
        restaurants,
        handleClickMenuItemEdit,
        handleClickMenuItemCopy,
        handleClickMenuItemDelete,
    } = dataAndMethodsContext;

    return restaurantMenuItems.map(menuItem => <MenuItemCardInventory menuItem={menuItem}
        myStates={myStates}
        restaurants={restaurants}
        handleClickMenuItemEdit={handleClickMenuItemEdit}
        handleClickMenuItemCopy={handleClickMenuItemCopy}
        handleClickMenuItemDelete={handleClickMenuItemDelete}
        key={menuItem.id} />);
};

export default MenuItemsInventory;