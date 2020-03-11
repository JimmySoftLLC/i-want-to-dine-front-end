import React, { useContext } from 'react';
import RestaurantItemCard from './RestaurantItemCard';
import DataAndMethodsContext from '../../context/dataAndMethods/dataAndMethodsContext';

const RestaurantItems = () => {
    const dataAndMethodsContext = useContext(DataAndMethodsContext);
    const { Restaurants } = dataAndMethodsContext;

    return Restaurants.map(RestaurantItem => <RestaurantItemCard
        restuarantItem={RestaurantItem}
        myStates={dataAndMethodsContext.myStates}
        handleClickRestaurantEdit={dataAndMethodsContext.handleClickRestaurantEdit}
        handleClickRestaurantCopy={dataAndMethodsContext.handleClickRestaurantCopy}
        handleClickRestaurantDelete={dataAndMethodsContext.handleClickRestaurantDelete}
        key={RestaurantItem.id} />);
};

export default RestaurantItems;