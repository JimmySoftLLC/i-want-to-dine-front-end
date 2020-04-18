import React, { useContext } from 'react';
import MenuItemCardInventory from './MenuItemCardInventory';
import DataAndMethodsContext from '../../context/dataAndMethods/dataAndMethodsContext';
import CircularIndeterminate from '../circularIndeterminate/CircularIndeterminate';

const MenuItemsInventory = () => {
    const dataAndMethodsContext = useContext(DataAndMethodsContext);
    const {
        restaurantMenuItems,
        myStates,
        restaurants,
        loading,
    } = dataAndMethodsContext;

    if (loading) {
        return <CircularIndeterminate />;
    } else {
        return restaurantMenuItems.map(menuItem => <MenuItemCardInventory menuItem={menuItem}
            myStates={myStates}
            restaurants={restaurants}
            key={menuItem.id} />);
    }
};

export default MenuItemsInventory;