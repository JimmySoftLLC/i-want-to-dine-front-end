import React, { useContext } from 'react';
import EntertainmentItemCardPublicFacing from './EntertainmentItemCardPublicFacing';
import DataAndMethodsContext from '../../context/dataAndMethods/dataAndMethodsContext';
import CircularIndeterminate from '../circularIndeterminate/CircularIndeterminate';

const EntertainmentItemsPublicFacing = () => {
    const dataAndMethodsContext = useContext(DataAndMethodsContext);
    const {
        entertainmentItems,
        myStates,
        restaurants,
        loading,
    } = dataAndMethodsContext;

    if (loading) {
        return <CircularIndeterminate />;
    } else {
        return entertainmentItems.map(entertainmentItem => <EntertainmentItemCardPublicFacing entertainmentItem={entertainmentItem}
            myStates={myStates}
            restaurants={restaurants}
            key={entertainmentItem.id} />);
    }
};

export default EntertainmentItemsPublicFacing;