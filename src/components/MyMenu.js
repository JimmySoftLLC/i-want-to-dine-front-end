import React, { useContext } from 'react';
import MenuItemCard from './MenuItemCard';
import DataAndMethodsContext from '../../context/dataAndMethods/dataAndMethodsContext';

const MenuItems = () => {
    const dataAndMethodsContext = useContext(DataAndMethodsContext);
    const {
        menuItems,
        myStates,
        restaurants,
        handleClickMenuItemEdit,
        handleClickMenuItemCopy,
        handleClickMenuItemDelete,
    } = dataAndMethodsContext;

    const dude = menuItems.map(menuItem => <MenuItemCard menuItem={menuItem}
        myStates={myStates}
        restaurants={restaurants}
        handleClickMenuItemEdit={handleClickMenuItemEdit}
        handleClickMenuItemCopy={handleClickMenuItemCopy}
        handleClickMenuItemDelete={handleClickMenuItemDelete}
        key={menuItem.id} />);
};

export default MenuItems;