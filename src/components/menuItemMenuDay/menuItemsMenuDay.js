import React, { useContext } from 'react';
import MenuItemCardMenuDay from './menuItemCardMenuDay';
import DataAndMethodsContext from '../../context/dataAndMethods/dataAndMethodsContext';

const MenuItemsMenuDay = (menuDayId) => {
    const dataAndMethodsContext = useContext(DataAndMethodsContext);
    const {
        restaurantMenuItems,
        myStates,
    } = dataAndMethodsContext;

    return restaurantMenuItems.map(menuItem => <MenuItemCardMenuDay menuItem={menuItem}
        myStates={myStates}
        isInList={true}
        menuDayId={menuDayId}
        menuItemId={menuItem.id}
        key={menuItem.id} />);
};

export default MenuItemsMenuDay;