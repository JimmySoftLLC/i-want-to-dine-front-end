import React, { useContext } from 'react';
import MenuItemCardMenuDay from './MenuItemCardMenuDay';
import DataAndMethodsContext from '../../context/dataAndMethods/dataAndMethodsContext';

const MenuItemsMenuDay = (menuDayId: any) => {
    const dataAndMethodsContext: any = useContext(DataAndMethodsContext);
    const {
        restaurantMenuItems,
        myStates,
    } = dataAndMethodsContext;

    return restaurantMenuItems.map((menuItem: { id: any; }) => <MenuItemCardMenuDay menuItem={menuItem}
        myStates={myStates}
        isInList={true}
        menuDayId={menuDayId}
        menuItemId={menuItem.id}
        key={menuItem.id} />);
};

export default MenuItemsMenuDay;