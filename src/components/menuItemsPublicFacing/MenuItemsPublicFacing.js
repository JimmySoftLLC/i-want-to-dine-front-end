import React, { useContext } from 'react';
import MenuItemCardPublicFacing from './MenuItemCardPublicFacing';
import DataAndMethodsContext from '../../context/dataAndMethods/dataAndMethodsContext';

const MenuItemsPublicFacing = () => {
    const dataAndMethodsContext = useContext(DataAndMethodsContext);
    const {
        menuItems,
        myStates,
        restaurants,
    } = dataAndMethodsContext;

    return menuItems.map(menuItem => <MenuItemCardPublicFacing menuItem={menuItem}
        myStates={myStates}
        restaurants={restaurants}
        key={menuItem.id} />);
};

export default MenuItemsPublicFacing;