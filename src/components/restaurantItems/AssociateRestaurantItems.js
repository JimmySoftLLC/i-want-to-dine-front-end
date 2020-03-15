import React, { useContext } from 'react';
import RestaurantItemCard from './RestaurantItemCard';
import DataAndMethodsContext from '../../context/dataAndMethods/dataAndMethodsContext';

const AssociateRestaurantItems = () => {
    const dataAndMethodsContext = useContext(DataAndMethodsContext);
    const {
        associateRestaurants,
        handleClickRestaurantEdit,
        handleClickRestaurantCopy,
        handleClickRestaurantDelete,
    } = dataAndMethodsContext;
    return associateRestaurants.map(restaurantItem => <RestaurantItemCard
        restaurantItem={restaurantItem}
        handleClickRestaurantEdit={handleClickRestaurantEdit}
        handleClickRestaurantCopy={handleClickRestaurantCopy}
        handleClickRestaurantDelete={handleClickRestaurantDelete}
        key={restaurantItem.id} />);
};

export default AssociateRestaurantItems;