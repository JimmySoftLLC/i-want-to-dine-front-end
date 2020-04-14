
import findIndexOfAssociateInRestaurant from './findIndexOfAssociateInRestaurant';
import putAssociate from './putAssociate';
import removeRestaurantFromAssociate from './removeRestaurantFromAssociate';
import removeAssociateFromRestaurant from './removeAssociateFromRestaurant';
import getAssociateFromRestaurant from './getAssociateFromRestaurant';
import getAssociate from './getAssociate';
import checkIfOneAdminInRestaurant from './checkIfOneAdminInRestaurant';

// find index where assoicate is in restaurant associates array
// figure out if associate can be removed, restaurant always must have at least one admin
// remove restaurant from associates restaurant array and save assocaite to database
const deleteAssociateFromRestaurantById = async (restaurantId, associateId, myRestaurant, checkAdmin, idToken, customId) => {
    let myAssociate = getAssociateFromRestaurant(myRestaurant, associateId)
    let myIndex = findIndexOfAssociateInRestaurant(myRestaurant, associateId)
    // check if can remove this associate
    let tempRestaurant = JSON.parse(JSON.stringify(myRestaurant))
    tempRestaurant.associatesJSON.splice(myIndex, 1)
    if (!checkIfOneAdminInRestaurant(tempRestaurant) && checkAdmin) {
        return null;
    }
    myRestaurant = await removeAssociateFromRestaurant(myRestaurant, associateId)
    myAssociate = await removeRestaurantFromAssociate(myAssociate, restaurantId)
    // if associate in database save update to database
    const tempAssociate = await getAssociate(myAssociate.id, idToken, customId)
    if (tempAssociate) {
        await putAssociate(myAssociate, idToken, customId)
    }
    return myRestaurant;
}

export default deleteAssociateFromRestaurantById