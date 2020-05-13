import React, { useContext } from 'react';
import EntertainmentItemCardInventory from './EntertainmentItemCardInventory';
import DataAndMethodsContext from '../../context/dataAndMethods/dataAndMethodsContext';
import CircularIndeterminate from '../circularIndeterminate/CircularIndeterminate';

const EntertainmentItemsInventory = () => {
    const dataAndMethodsContext = useContext(DataAndMethodsContext);
    const {
        restaurantEntertainmentItems,
        myStates,
        restaurants,
        loading,
    } = dataAndMethodsContext;

    if (loading) {
        return <CircularIndeterminate />;
    } else {
        return (
            <div>
                {(restaurantEntertainmentItems.map(entertainmentItem => <EntertainmentItemCardInventory entertainmentItem={entertainmentItem}
                    myStates={myStates}
                    restaurants={restaurants}
                    key={entertainmentItem.id}
                />))}
            </div>
        );
    }
};

export default EntertainmentItemsInventory;