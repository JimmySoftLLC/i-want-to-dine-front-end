import React, { useContext } from 'react';
import EntertainmentItemCardMenuDay from './EntertainmentItemCardMenuDay';
import DataAndMethodsContext from '../../context/dataAndMethods/dataAndMethodsContext';

const EntertainmentItemsMenuDay = (menuDayId) => {
    const dataAndMethodsContext = useContext(DataAndMethodsContext);
    const {
        restaurantEntertainmentItems,
        myStates,
    } = dataAndMethodsContext;

    return restaurantEntertainmentItems.map(entertainmentItem => <EntertainmentItemCardMenuDay entertainmentItem={entertainmentItem}
        myStates={myStates}
        isInList={true}
        menuDayId={menuDayId}
        entertainmentItemId={entertainmentItem.id}
        key={entertainmentItem.id} />);
};

export default EntertainmentItemsMenuDay;