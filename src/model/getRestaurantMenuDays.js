import batchGetItemDynamoDB from '../api/batchGetItemDynamoDB';

import {
    menuDaysTableName,
    projectionExpressionMenuItem,
} from '../api/apiConstants';

const getBatch = async (myIds) => {
    let myRestaurantMenuDays = []
    const data = await batchGetItemDynamoDB(menuDaysTableName, myIds, projectionExpressionMenuItem)
    if (data.err) {
        return [];
    }
    myRestaurantMenuDays = data.payload.Responses.menuDays;
    for (let i = 0; i < myRestaurantMenuDays.length; i++) {
        myRestaurantMenuDays[i].categoryJSON = JSON.parse(myRestaurantMenuDays[i].categoryJSON)
    }
    return myRestaurantMenuDays;
}

const getRestaurantMenuDays = async (restaurant) => {
    // create an array of all ids
    let allIds = restaurant.menuDayIdsJSON;
    let myRestaurantMenuDays = [];

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
            myRestaurantMenuDays = myRestaurantMenuDays.concat(myBatch)
            lastValidNextIndex = i + 1;
        }
    }

    // get any leftover records
    myIds = [];
    for (let i = lastValidNextIndex; i < allIds.length; i++) {
        myIds.push(allIds[i]);
    }
    const myBatch = await getBatch(myIds);
    myRestaurantMenuDays = myRestaurantMenuDays.concat(myBatch)

    //console.log(myRestaurantMenuDays);
    return myRestaurantMenuDays;
}

export default getRestaurantMenuDays