import React, { useContext } from 'react';
import AssociateRestaurantDetailCard from './AssociateRestaurantDetailCard';
import DataAndMethodsContext from '../../context/dataAndMethods/dataAndMethodsContext';
import CircularIndeterminate from '../circularIndeterminate/CircularIndeterminate';
import sortAssociates from '../../model/associate/sortAssociates';

const AssociatesRestaurantDetail = () => {
    const dataAndMethodsContext = useContext(DataAndMethodsContext);
    const {
        loading,
        restaurantDetail,
    } = dataAndMethodsContext;

    let associateInIds = [];
    let finalAssociates = []

    for (let i = 0; i < restaurantDetail.menuDayIdsJSON.length; i++) {
        let myIndex = restaurantDetail.menuDays.findIndex(x => x.id === restaurantDetail.menuDayIdsJSON[i]);
        if (myIndex !== -1) {
            for (let j = 0; j < restaurantDetail.menuDays[myIndex].associatesJSON.length; j++) {
                let isInArray = associateInIds.findIndex(x => x === restaurantDetail.menuDays[myIndex].associatesJSON[j]);
                if (isInArray === -1) {
                    associateInIds.push(restaurantDetail.menuDays[myIndex].associatesJSON[j])
                }
            }
        }
    }

    let associatesIn = [];

    for (let i = 0; i < associateInIds.length; i++) {
        let myIndex = restaurantDetail.associates.findIndex(x => x.id === associateInIds[i]);
        if (myIndex !== -1) {
            associatesIn.push(restaurantDetail.associates[myIndex])
        }
    }

    finalAssociates = finalAssociates.concat(associatesIn)

    let associatesOut = [];

    for (let i = 0; i < restaurantDetail.associates.length; i++) {
        let myIndex = associateInIds.indexOf(restaurantDetail.associates[i].id);
        if (myIndex === -1) {
            associatesOut.push(restaurantDetail.associates[i])
        }
    }

    finalAssociates = finalAssociates.concat(associatesOut);

    finalAssociates = sortAssociates(finalAssociates, null);

    if (loading) {
        return <CircularIndeterminate />;
    } else {
        return (
            <div className='grid-4 page-bottom-margin'>
                {finalAssociates.map(associate => <AssociateRestaurantDetailCard associate={associate}
                    key={associate.id} />)}
            </div>
        );
    }
};

export default AssociatesRestaurantDetail;