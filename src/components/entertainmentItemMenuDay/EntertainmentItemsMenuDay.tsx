import React, { useContext } from 'react';
import EntertainmentItemCardMenuDay from './EntertainmentItemCardMenuDay';
import DataAndMethodsContext from '../../context/dataAndMethods/dataAndMethodsContext';

const EntertainmentItemsMenuDay = (menuDayId: any) => {
    const dataAndMethodsContext: any = useContext(DataAndMethodsContext);
    const {
        restaurantEntertainmentItems,
        myStates,
    } = dataAndMethodsContext;

    return restaurantEntertainmentItems.map((entertainmentItem: { id: any; }) => <EntertainmentItemCardMenuDay entertainmentItem={entertainmentItem}
        myStates={myStates}
        isInList={true}
        menuDayId={menuDayId}
        entertainmentItemId={entertainmentItem.id}
        key={entertainmentItem.id} />);
};

export default EntertainmentItemsMenuDay;