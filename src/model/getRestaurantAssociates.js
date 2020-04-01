import batchGetItemDynamoDB from '../api/batchGetItemDynamoDB';

import {
    associatesTableName,
    projectionExpressionAssociates,
} from '../api/apiConstants';

const getBatch = async (myIds) => {
    let myRestaurantAssociates = []
    const data = await batchGetItemDynamoDB(associatesTableName, myIds, projectionExpressionAssociates)
    if (data.err) {
        return [];
    }
    myRestaurantAssociates = data.payload.Responses.associates;
    for (let i = 0; i < myRestaurantAssociates.length; i++) {
        myRestaurantAssociates[i].restaurantIdsJSON = JSON.parse(myRestaurantAssociates[i].restaurantIdsJSON)
    }
    return myRestaurantAssociates;
}

const getRestaurantAssociates = async (restaurant) => {
    // console.log(restaurant);
    // create an array of all ids
    let allRestaurantAssociates = restaurant.associatesJSON;
    let myRestaurantAssociates = [];

    // get records in batches of 100
    let myIds = [];
    let currentCount = 0;
    let lastValidNextIndex = 0;
    for (let i = 0; i < allRestaurantAssociates.length; i++) {
        myIds.push(allRestaurantAssociates[i].id);
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
    for (let i = lastValidNextIndex; i < allRestaurantAssociates.length; i++) {
        myIds.push(allRestaurantAssociates[i].id);
    }
    const myBatch = await getBatch(myIds);
    myRestaurantAssociates = myRestaurantAssociates.concat(myBatch)

    //console.log(myRestaurantAssociates);
    return myRestaurantAssociates;
}

export default getRestaurantAssociates