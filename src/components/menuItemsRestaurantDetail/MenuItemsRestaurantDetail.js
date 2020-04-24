import React, { useContext } from 'react';
import MenuItemRestaurantDetailCard from './MenuItemRestaurantDetailCard';
import DataAndMethodsContext from '../../context/dataAndMethods/dataAndMethodsContext';
import CircularIndeterminate from '../circularIndeterminate/CircularIndeterminate';

const MenuItemsRestaurantDetail = () => {
    const dataAndMethodsContext = useContext(DataAndMethodsContext);
    const {
        loading,
        restaurantDetail,
    } = dataAndMethodsContext;

    if (loading) {
        return <CircularIndeterminate />;
    } else {
        return restaurantDetail.menuItems.map(menuItem => <MenuItemRestaurantDetailCard menuItem={menuItem}
            key={menuItem.id} />);
    }
};

export default MenuItemsRestaurantDetail;