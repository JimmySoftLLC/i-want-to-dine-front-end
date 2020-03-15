import React, { useContext } from 'react';
import RestaurantItemCard from './RestaurantItemCard';
import DataAndMethodsContext from '../../context/dataAndMethods/dataAndMethodsContext';

const RestaurantItems = () => {
    const dataAndMethodsContext = useContext(DataAndMethodsContext);
    const {
        restaurants,
        handleClickRestaurantEdit,
        handleClickRestaurantCopy,
        handleClickRestaurantDelete,
    } = dataAndMethodsContext;

    return restaurants.map(restaurantItem => <RestaurantItemCard
        restaurantItem={restaurantItem}
        handleClickRestaurantEdit={handleClickRestaurantEdit}
        handleClickRestaurantCopy={handleClickRestaurantCopy}
        handleClickRestaurantDelete={handleClickRestaurantDelete}
        key={restaurantItem.id} />);
};

export default RestaurantItems;