import batchGetItemDynamoDB from '../api/batchGetItemDynamoDB';

import {
    menuDaysTableName,
    projectionExpressionMenuDay,
} from '../api/apiConstants';

const getBatch = async (myIds) => {
    let myRestaurantMenuDays = []
    const data = await batchGetItemDynamoDB(menuDaysTableName, myIds, projectionExpressionMenuDay)
    if (data.err) {
        return [];
    }

    myRestaurantMenuDays = data.payload.Responses.menuDays;
    for (let i = 0; i < myRestaurantMenuDays.length; i++) {
        myRestaurantMenuDays[i].menuIdsJSON = JSON.parse(myRestaurantMenuDays[i].menuIdsJSON)
        myRestaurantMenuDays[i].associatesJSON = JSON.parse(myRestaurantMenuDays[i].associatesJSON)
        myRestaurantMenuDays[i].dateFrom = new Date(myRestaurantMenuDays[i].dateFrom)
        myRestaurantMenuDays[i].dateTo = new Date(myRestaurantMenuDays[i].dateTo)
    }
    return myRestaurantMenuDays;
}

const getRestaurantMenuDays = async (restaurant) => {
    // console.log(restaurant);
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