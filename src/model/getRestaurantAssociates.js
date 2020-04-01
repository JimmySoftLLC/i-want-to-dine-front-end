import batchGetItemDynamoDB from '../api/batchGetItemDynamoDB';

import {
    associatesTableName,
} from '../api/apiConstants';

const getBatch = async (myIds) => {
    let myRestaurantAssociates = []
    const data = await batchGetItemDynamoDB(associatesTableName, myIds, associatesTableName)
    if (data.err) {
        return [];
    }

    myRestaurantAssociates = data.payload.Responses.Associates;
    for (let i = 0; i < myRestaurantAssociates.length; i++) {
        myRestaurantAssociates[i].menuIdsJSON = JSON.parse(myRestaurantAssociates[i].menuIdsJSON)
        myRestaurantAssociates[i].dateFrom = new Date(myRestaurantAssociates[i].dateFrom)
        myRestaurantAssociates[i].dateTo = new Date(myRestaurantAssociates[i].dateTo)
    }
    return myRestaurantAssociates;
}

const getRestaurantAssociates = async (restaurant) => {
    // console.log(restaurant);
    // create an array of all ids
    let allIds = restaurant.menuDayIdsJSON;
    let myRestaurantAssociates = [];

    // get records in batches of 100
    let myIds = [];
    let currentCount = 0;
    let lastValidNextIndex = 0;
    for (let i = 0; i < allIds.length; i++) {
        myIds.push(allIds[i]);
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
    for (let i = lastValidNextIndex; i < allIds.length; i++) {
        myIds.push(allIds[i]);
    }
    const myBatch = await getBatch(myIds);
    myRestaurantAssociates = myRestaurantAssociates.concat(myBatch)

    //console.log(myRestaurantAssociates);
    return myRestaurantAssociates;
}

export default getRestaurantAssociates