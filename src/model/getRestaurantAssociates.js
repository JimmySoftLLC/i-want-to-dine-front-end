import batchGetItemDynamoDB from '../api/batchGetItemDynamoDB';
import validEmail from './validEmail';
import getAssociateFromRestaurant from './getAssociateFromRestaurant';

import {
    associatesTableName,
    projectionExpressionAssociates,
    blankPlaceHolder,
} from '../api/apiConstants';

const getBatch = async (myIds) => {
    let myRestaurantAssociates = []
    const data = await batchGetItemDynamoDB(associatesTableName, myIds, projectionExpressionAssociates)
    if (data.err) {
        return [];
    }
    myRestaurantAssociates = data.payload.Responses.associates;
    for (let i = 0; i < myRestaurantAssociates.length; i++) {
        myRestaurantAssociates[i].firstName = myRestaurantAssociates[i].firstName === blankPlaceHolder ? '' : myRestaurantAssociates[i].firstName
        myRestaurantAssociates[i].lastName = myRestaurantAssociates[i].lastName === blankPlaceHolder ? '' : myRestaurantAssociates[i].lastName
        myRestaurantAssociates[i].email = myRestaurantAssociates[i].email === blankPlaceHolder ? '' : myRestaurantAssociates[i].email
        myRestaurantAssociates[i].bio = myRestaurantAssociates[i].bio === blankPlaceHolder ? '' : myRestaurantAssociates[i].bio
        myRestaurantAssociates[i].jobTitle = myRestaurantAssociates[i].jobTitle === blankPlaceHolder ? '' : myRestaurantAssociates[i].jobTitle
        myRestaurantAssociates[i].restaurantIdsJSON = JSON.parse(myRestaurantAssociates[i].restaurantIdsJSON)
    }
    return myRestaurantAssociates;
}

// get associates from the database if they have emails, otherwise get them from restaurant associateJSON
// do this by creating an array of associateIds for records that have email, these will be on server
// those that don't have email are local to the restaurant just use that record instead
const getRestaurantAssociates = async (restaurant) => {
    let restaurantAssociates = restaurant.associatesJSON;
    let associateIds = [];
    let myRestaurantAssociates = [];
    let myRestaurantAssociatesNoEmail = [];

    for (let i = 0; i < restaurantAssociates.length; i++) {
        if (validEmail(restaurantAssociates[i].email)) {
            associateIds.push(restaurantAssociates[i].id);
        } else {
            myRestaurantAssociatesNoEmail.push(restaurantAssociates[i]);
        }
    }

    // get records in batches of 100 using the array of associateIds
    let myIds = [];
    let currentCount = 0;
    let lastValidNextIndex = 0;
    for (let i = 0; i < associateIds.length; i++) {
        // console.log(associateIds[i]);
        myIds.push(associateIds[i]);
        currentCount++;
        if (currentCount > 99) {
            const myBatch = await getBatch(myIds);
            myIds = [];
            currentCount = 0
            myRestaurantAssociates = myRestaurantAssociates.concat(myBatch)
            lastValidNextIndex = i + 1;
        }
    }

    // get any leftover records
    myIds = [];
    for (let i = lastValidNextIndex; i < associateIds.length; i++) {
        myIds.push(associateIds[i]);
    }
    const myBatch = await getBatch(myIds);
    myRestaurantAssociates = myRestaurantAssociates.concat(myBatch)

    // now add access to records from the database, restaurant access exists in restaurant only
    for (let i = 0; i < myRestaurantAssociates.length; i++) {
        myRestaurantAssociates[i].accessLevel = getAssociateFromRestaurant(restaurant, myRestaurantAssociates[i].id).accessLevel
    }

    // console.log(myRestaurantAssociates, myRestaurantAssociatesNoEmail);
    // now add local records
    myRestaurantAssociates = myRestaurantAssociates.concat(myRestaurantAssociatesNoEmail)

    return myRestaurantAssociates;
}

export default getRestaurantAssociates