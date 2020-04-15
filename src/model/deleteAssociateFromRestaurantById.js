
import findIndexOfAssociateInRestaurant from './findIndexOfAssociateInRestaurant';
import putAssociate from './putAssociate';
import removeRestaurantFromAssociate from './removeRestaurantFromAssociate';
import removeAssociateFromRestaurant from './removeAssociateFromRestaurant';
import getAssociate from './getAssociate';
import checkIfOneAdminInRestaurant from './checkIfOneAdminInRestaurant';

// find index where assoicate is in restaurant associates array
// figure out if associate can be removed, restaurant always must have at least one admin
// remove restaurant from associates restaurant array and save assocaite to database
const deleteAssociateFromRestaurantById = async (restaurantId, associateId, restaurant, checkAdmin, idToken, customId) => {
    let myRestaurant = JSON.parse(JSON.stringify(restaurant))
    let myIndex = findIndexOfAssociateInRestaurant(myRestaurant, associateId)
    // check if can remove this associate
    let checkRestaurant = JSON.parse(JSON.stringify(myRestaurant))
    checkRestaurant.associatesJSON.splice(myIndex, 1)
    if (!checkIfOneAdminInRestaurant(checkRestaurant) && checkAdmin) {
        return null;
    }
    myRestaurant = await removeAssociateFromRestaurant(myRestaurant, associateId)
    // if associate in database save an update to database
    let databaseAssociate = await getAssociate(associateId, idToken, customId)
    if (databaseAssociate) {
        databaseAssociate = await removeRestaurantFromAssociate(databaseAssociate, restaurantId)
        await putAssociate(databaseAssociate, idToken, customId)
    }
    return myRestaurant;
}

export default deleteAssociateFromRestaurantById