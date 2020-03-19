import React, { useContext } from 'react';
import MenuItemCardPublicFacing from './MenuItemCardPublicFacing';
import DataAndMethodsContext from '../../context/dataAndMethods/dataAndMethodsContext';

const MenuItemsPublicFacing = () => {
    const dataAndMethodsContext = useContext(DataAndMethodsContext);
    const {
        menuItems,
        myStates,
        restaurants,
        handleClickMenuItemEdit,
        handleClickMenuItemCopy,
        handleClickMenuItemDelete,
    } = dataAndMethodsContext;

    return menuItems.map(menuItem => <MenuItemCardPublicFacing menuItem={menuItem}
        myStates={myStates}
        restaurants={restaurants}
        handleClickMenuItemEdit={handleClickMenuItemEdit}
        handleClickMenuItemCopy={handleClickMenuItemCopy}
        handleClickMenuItemDelete={handleClickMenuItemDelete}
        key={menuItem.id} />);
};

export default MenuItemsPublicFacing;