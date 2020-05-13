import React, { useContext } from 'react';
import EntertainmentItemRestaurantDetailCard from './EntertainmentItemRestaurantDetailCard';
import DataAndMethodsContext from '../../context/dataAndMethods/dataAndMethodsContext';
import CircularIndeterminate from '../circularIndeterminate/CircularIndeterminate';

const EntertainmentItemsRestaurantDetail = () => {
    const dataAndMethodsContext = useContext(DataAndMethodsContext);
    const {
        loading,
        restaurantDetail,
    } = dataAndMethodsContext;

    if (loading) {
        return <CircularIndeterminate />;
    } else {
        return restaurantDetail.entertainmentItems.map(entertainmentItem => <EntertainmentItemRestaurantDetailCard entertainmentItem={entertainmentItem}
            key={entertainmentItem.id} />);
    }
};

export default EntertainmentItemsRestaurantDetail;