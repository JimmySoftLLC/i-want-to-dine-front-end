import React, { useContext } from 'react';
import AssociateCard from './AssociateCard';
import DataAndMethodsContext from '../../context/dataAndMethods/dataAndMethodsContext';
import CircularIndeterminate from '../circularIndeterminate/CircularIndeterminate';

const Associates = () => {
    const dataAndMethodsContext = useContext(DataAndMethodsContext);
    const {
        restaurantAssociates,
        myStates,
        loading,
    } = dataAndMethodsContext;

    if (loading) {
        return <CircularIndeterminate />;
    } else {
        return restaurantAssociates.map(Associate => <AssociateCard Associate={Associate}
            myStates={myStates}
            key={Associate.id} />);
    }
};

export default Associates;




