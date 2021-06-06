
import findIndexOfAssociateInRestaurant from '../associate/findIndexOfAssociateInRestaurant';
import putAssociate from '../associate/putAssociate';
import removeRestaurantFromIds from '../associate/removeRestaurantFromIds';
import removeAssociateFromRestaurant from './removeAssociateFromRestaurant';
import getAssociate from '../associate/getAssociate';
import isAdminInRestaurant from './isAdminInRestaurant';
import { blankImage } from '../../api/apiConstants';
import deleteImageAPI from '../images/deleteImageAPI';

// find index where assoicate is in restaurant associates array
// figure out if associate can be removed, restaurant always must have at least one admin
// remove restaurant from associates restaurant array and save assocaite to database
const deleteAssociateFromRestaurant = async (restaurantId, associateId, restaurant, checkAdmin, idToken, customId) => {
    let myRestaurant = JSON.parse(JSON.stringify(restaurant))
    let myIndex = findIndexOfAssociateInRestaurant(myRestaurant, associateId)
    // check if can remove this associate
    let checkRestaurant = JSON.parse(JSON.stringify(myRestaurant))
    let myRemovedAssociate = checkRestaurant.associatesJSON.splice(myIndex, 1)
    if (!isAdminInRestaurant(checkRestaurant) && checkAdmin) {
        return null;
    }
    myRestaurant = await removeAssociateFromRestaurant(myRestaurant, associateId)
    let databaseAssociate = await getAssociate(associateId, idToken, customId)
    if (databaseAssociate) { // if associate in database save an update to database
        databaseAssociate = await removeRestaurantFromIds(databaseAssociate, restaurantId)
        await putAssociate(databaseAssociate, idToken, customId)
    } else { // if not in database delete photo saved in S3 if there is one
        if (myRemovedAssociate) {
            if (myRemovedAssociate[0].imageUrl !== blankImage) {
                await deleteImageAPI(myRemovedAssociate[0].imageUrl, idToken, customId)
            }
        }
    }
    return myRestaurant;
}

export default deleteAssociateFromRestaurant