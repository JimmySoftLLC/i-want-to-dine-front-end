import React, { useContext } from 'react';
import RestaurantItemCard from './RestaurantItemCard';
import DataAndMethodsContext from '../../context/dataAndMethods/dataAndMethodsContext';

const RestaurantItems = () => {
    const dataAndMethodsContext = useContext(DataAndMethodsContext);
    const {
        restaurants,
    } = dataAndMethodsContext;

    return restaurants.map(restaurantItem => <RestaurantItemCard
        restaurantItem={restaurantItem}
        key={restaurantItem.id} />);
};

export default RestaurantItems;