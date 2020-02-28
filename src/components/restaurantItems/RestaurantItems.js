import React, { useContext } from 'react';
import RestaurantItemCard from './RestaurantItemCard';
import DataAndMethodsContext from '../../context/dataAndMethods/dataAndMethodsContext';

const RestaurantItems = () => {
    const dataAndMethodsContext = useContext(DataAndMethodsContext);
    const { restaurants } = dataAndMethodsContext;

    function compare(a, b) {
        const keyA = a.name.toUpperCase();
        const keyB = b.name.toUpperCase();

        let comparison = 0;
        if (keyA > keyB) {
            comparison = 1;
        } else if (keyA < keyB) {
            comparison = -1;
        }
        return comparison;
    }

    let mySortedResturants = restaurants.sort(compare);

    return mySortedResturants.map(resturantItem => <RestaurantItemCard restuarantItem={resturantItem}
        myStates={dataAndMethodsContext.myStates}
        key={resturantItem.id} />);
};

export default RestaurantItems;