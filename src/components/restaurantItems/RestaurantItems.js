import React, { useContext } from 'react';
import RestaurantItemCard from './RestaurantItemCard';
import DataAndMethodsContext from '../../context/dataAndMethods/dataAndMethodsContext';

const RestaurantItems = () => {
    const dataAndMethodsContext = useContext(DataAndMethodsContext);
    const { restaurants } = dataAndMethodsContext;

    return restaurants.map(resturantItem => <RestaurantItemCard restuarantItem={resturantItem}
        myStates={dataAndMethodsContext.myStates}
        key={resturantItem.id} />);
};

export default RestaurantItems;