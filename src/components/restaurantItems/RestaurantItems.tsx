import React, { useContext } from 'react';
import RestaurantItemCard from './RestaurantItemCard';
import DataAndMethodsContext from '../../context/dataAndMethods/dataAndMethodsContext';
import CircularIndeterminate from '../circularIndeterminate/CircularIndeterminate';

const RestaurantItems = () => {
    const dataAndMethodsContext: any = useContext(DataAndMethodsContext);
    const {
        restaurants,
        loading,
    } = dataAndMethodsContext;

    if (loading) {
        return <CircularIndeterminate />;
    } else {
        return restaurants.map((restaurantItem: { id: React.Key | null | undefined; }) => <RestaurantItemCard
            restaurantItem={restaurantItem}
            key={restaurantItem.id} />);
    }
};

export default RestaurantItems;