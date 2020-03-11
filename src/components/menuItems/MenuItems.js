import React, { useContext } from 'react';
import MenuItemCard from './MenuItemCard';
import DataAndMethodsContext from '../../context/dataAndMethods/dataAndMethodsContext';

const MenuItems = () => {
    const dataAndMethodsContext = useContext(DataAndMethodsContext);
    const { menuItems } = dataAndMethodsContext;

    return menuItems.map(menuItem => <MenuItemCard menuItem={menuItem}
        myStates={dataAndMethodsContext.myStates}
        Restaurants={dataAndMethodsContext.Restaurants}
        handleClickMenuItemEdit={dataAndMethodsContext.handleClickMenuItemEdit}
        handleClickMenuItemCopy={dataAndMethodsContext.handleClickMenuItemCopy}
        handleClickMenuItemDelete={dataAndMethodsContext.handleClickMenuItemDelete}
        key={menuItem.id} />);
};

export default MenuItems;