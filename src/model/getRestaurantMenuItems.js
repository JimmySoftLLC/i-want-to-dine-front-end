import batchGetItemDynamoDB from '../api/batchGetItemDynamoDB';

import {
    menuItemsTableName,
    projectionExpressionMenuItem,
    blankPlaceHolder,
} from '../api/apiConstants';

const getBatch = async (myIds) => {
    let myRestaurantsMenuItems = []
    const data = await batchGetItemDynamoDB(menuItemsTableName, myIds, projectionExpressionMenuItem)
    if (data.err) {
        return [];
    }
    myRestaurantsMenuItems = data.payload.Responses.menuItems;
    for (let i = 0; i < myRestaurantsMenuItems.length; i++) {
        myRestaurantsMenuItems[i].title = myRestaurantsMenuItems[i].title === blankPlaceHolder ? '' : myRestaurantsMenuItems[i].title
        myRestaurantsMenuItems[i].description = myRestaurantsMenuItems[i].description === blankPlaceHolder ? '' : myRestaurantsMenuItems[i].description
        myRestaurantsMenuItems[i].restaurant = myRestaurantsMenuItems[i].restaurant === blankPlaceHolder ? '' : myRestaurantsMenuItems[i].restaurant
        myRestaurantsMenuItems[i].categoryJSON = JSON.parse(myRestaurantsMenuItems[i].categoryJSON)
    }
    return myRestaurantsMenuItems;
}

const getRestaurantMenuItems = async (restaurant) => {
    // create an array of all ids
    let allIds = restaurant.menuItemIdsJSON;
    let myRestaurantsMenuItems = [];

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
            myRestaurantsMenuItems = myRestaurantsMenuItems.concat(myBatch)
            lastValidNextIndex = i + 1;
        }
    }

    // get any leftover records
    myIds = [];
    for (let i = lastValidNextIndex; i < allIds.length; i++) {
        myIds.push(allIds[i]);
    }
    const myBatch = await getBatch(myIds);
    myRestaurantsMenuItems = myRestaurantsMenuItems.concat(myBatch)

    //console.log(myRestaurantsMenuItems);
    return myRestaurantsMenuItems;
}

export default getRestaurantMenuItems