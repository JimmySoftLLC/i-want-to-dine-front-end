import React, { useContext } from 'react';
import MenuDayCard from './MenuDayCard';
import DataAndMethodsContext from '../../context/dataAndMethods/dataAndMethodsContext';

const MenuDaysInventory = () => {
    const dataAndMethodsContext = useContext(DataAndMethodsContext);
    const {
        restaurantMenuDays,
        myStates,
        handleClickMenuItemEdit,
        handleClickMenuItemCopy,
        handleClickMenuItemDelete,
    } = dataAndMethodsContext;

    return restaurantMenuDays.map(menuItem => <MenuDayCard menuItem={menuItem}
        myStates={myStates}
        handleClickMenuItemEdit={handleClickMenuItemEdit}
        handleClickMenuItemCopy={handleClickMenuItemCopy}
        handleClickMenuItemDelete={handleClickMenuItemDelete}
        key={menuItem.id} />);
};

export default MenuDaysInventory;