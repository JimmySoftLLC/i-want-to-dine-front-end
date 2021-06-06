import React, { useContext } from 'react';
import AssociateCardMenuDay from './AssociateCardMenuDay';
import DataAndMethodsContext from '../../context/dataAndMethods/dataAndMethodsContext';

const AssociatesMenuDay = (menuDayId: any) => {
    const dataAndMethodsContext: any = useContext(DataAndMethodsContext);
    const {
        restaurantAssociates,
        myStates,
    } = dataAndMethodsContext;

    return restaurantAssociates.map((associate: { id: any; }) => <AssociateCardMenuDay associate={associate}
        myStates={myStates}
        isInList={true}
        menuDayId={menuDayId}
        associateId={associate.id}
        key={associate.id} />);
};

export default AssociatesMenuDay;