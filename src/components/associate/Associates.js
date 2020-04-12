import React, { useContext } from 'react';
import AssociateCard from './AssociateCard';
import DataAndMethodsContext from '../../context/dataAndMethods/dataAndMethodsContext';

const Associates = () => {
    const dataAndMethodsContext = useContext(DataAndMethodsContext);
    const {
        restaurantAssociates,
        myStates,
    } = dataAndMethodsContext;

    return restaurantAssociates.map(Associate => <AssociateCard Associate={Associate}
        myStates={myStates}
        key={Associate.id} />);
};

export default Associates;