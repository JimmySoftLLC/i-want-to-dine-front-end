import batchGetItemDynamoDBNoKeys from '../api/batchGetItemDynamoDBNoKeys';

import {
    menuItemsTableName,
    projectionExpressionMenuItem,
} from '../api/apiConstants';


const getBatch = async (myIds) => {
    let myRestaurantsMenuItems = []
    const data = await batchGetItemDynamoDBNoKeys(menuItemsTableName, myIds, projectionExpressionMenuItem)
    if (data.err) {
        return [];
    }
    myRestaurantsMenuItems = data.payload;
    for (let i = 0; i < myRestaurantsMenuItems.length; i++) {
        myRestaurantsMenuItems[i].categoryJSON = JSON.parse(myRestaurantsMenuItems[i].categoryJSON)
    }
    return myRestaurantsMenuItems;
}

const getRestaurantsMenuItems = async (restaurants) => {
    let allIds = [];
    let myRestaurantsMenuItems = [];
    for (let i = 0; i < restaurants.length; i++) {

        if (restaurants[i].approved) {
            for (let j = 0; j < restaurants[i].menuItemIdsJSON.length; j++) {
                allIds.push(restaurants[i].menuItemIdsJSON[j])
            }
        }
    }
    // console.log(allIds);
    let myIds = [];
    let currentCount = 0;
    let lastValidNextIndex = 0;
    for (let i = 0; i < allIds.length; i++) {
        myIds.push(allIds[i]);
        currentCount++;
        if (currentCount > 99) {
            const dude = await getBatch(myIds);
            myIds = [];
            currentCount = 0
            myRestaurantsMenuItems = myRestaurantsMenuItems.concat(dude)
            lastValidNextIndex = i + 1;
        }
    }
    myIds = [];
    for (let i = lastValidNextIndex; i < allIds.length; i++) {
        myIds.push(allIds[i]);
    }
    const dude = await getBatch(myIds);
    myRestaurantsMenuItems = myRestaurantsMenuItems.concat(dude)
    // console.log(myRestaurantsMenuItems);
    return myRestaurantsMenuItems;
}

export default getRestaurantsMenuItems