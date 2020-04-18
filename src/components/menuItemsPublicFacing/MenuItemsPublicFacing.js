import React, { useContext } from 'react';
import MenuItemCardPublicFacing from './MenuItemCardPublicFacing';
import DataAndMethodsContext from '../../context/dataAndMethods/dataAndMethodsContext';
import CircularIndeterminate from '../circularIndeterminate/CircularIndeterminate';

const MenuItemsPublicFacing = () => {
    const dataAndMethodsContext = useContext(DataAndMethodsContext);
    const {
        menuItems,
        myStates,
        restaurants,
        loading,
    } = dataAndMethodsContext;

    if (loading) {
        return <CircularIndeterminate />;
    } else {
        return menuItems.map(menuItem => <MenuItemCardPublicFacing menuItem={menuItem}
            myStates={myStates}
            restaurants={restaurants}
            key={menuItem.id} />);
    }
};

export default MenuItemsPublicFacing;