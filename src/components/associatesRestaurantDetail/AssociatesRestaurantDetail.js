import React, { useContext } from 'react';
import AssociateRestaurantDetailCard from './AssociateRestaurantDetailCard';
import DataAndMethodsContext from '../../context/dataAndMethods/dataAndMethodsContext';
import CircularIndeterminate from '../circularIndeterminate/CircularIndeterminate';

const AssociatesRestaurantDetail = () => {
    const dataAndMethodsContext = useContext(DataAndMethodsContext);
    const {
        loading,
        restaurantDetail,
    } = dataAndMethodsContext;

    let myTempAssociateIds = [];

    for (let i = 0; i < restaurantDetail.menuDayIdsJSON.length; i++) {
        let myIndex = restaurantDetail.menuDays.findIndex(x => x.id === restaurantDetail.menuDayIdsJSON[i]);
        if (myIndex !== -1) {
            for (let j = 0; j < restaurantDetail.menuDays[myIndex].associatesJSON.length; j++) {
                let isInArray = myTempAssociateIds.findIndex(x => x === restaurantDetail.menuDays[myIndex].associatesJSON[j]);
                if (isInArray === -1) {
                    myTempAssociateIds.push(restaurantDetail.menuDays[myIndex].associatesJSON[j])
                }
            }
        }
    }

    let myTempAssociates = [];

    for (let i = 0; i < myTempAssociateIds.length; i++) {
        let myIndex = restaurantDetail.associates.findIndex(x => x.id === myTempAssociateIds[i]);
        if (myIndex !== -1) {
            myTempAssociates.push(restaurantDetail.associates[myIndex])
        }
    }

    if (loading) {
        return <CircularIndeterminate />;
    } else {
        return (
            <div className='grid-4 page-bottom-margin'>
                {myTempAssociates.map(associate => <AssociateRestaurantDetailCard associate={associate}
                    key={associate.id} />)}
            </div>
        );


        return (myTempAssociates.map(associate => <AssociateRestaurantDetailCard associate={associate}
            key={associate.id} />));
    }
};

export default AssociatesRestaurantDetail;