import React, { useContext } from 'react';
import AssociateCard from './AssociateCard';
import DataAndMethodsContext from '../../context/dataAndMethods/dataAndMethodsContext';
import CircularIndeterminate from '../circularIndeterminate/CircularIndeterminate';

const Associates = () => {
    const dataAndMethodsContext: any = useContext(DataAndMethodsContext);
    const {
        restaurantAssociates,
        myStates,
        loading,
    } = dataAndMethodsContext;

    if (loading) {
        return <CircularIndeterminate />;
    } else {
        return (
            <div className='grid-4'>
                {(restaurantAssociates.map((Associate: { id: any; }) => <AssociateCard Associate={Associate}
                    myStates={myStates}
                    key={Associate.id}
                />))}
            </div>
        );
    }
};

export default Associates;