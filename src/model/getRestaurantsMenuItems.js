import batchGetItemDynamoDB from '../api/batchGetItemDynamoDB';
import getRestaurantMenuDays from './getRestaurantMenuDays';
import validDate from './validDate';

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

const getRestaurantsMenuItems = async (restaurants) => {
    // create an array of all ids
    let menuItemIds = [];
    let myRestaurantsMenuItems = [];
    let myMenuDays = {};
    let myDateNow = new Date();
    for (let i = 0; i < restaurants.length; i++) {
        if (restaurants[i].approved) {
            myMenuDays = await getRestaurantMenuDays(restaurants[i])
            for (let j = 0; j < myMenuDays.length; j++) {
                if (validDate(myMenuDays[j].dateFrom, myMenuDays[j].dateTo, myDateNow)) {
                    for (let k = 0; k < myMenuDays[j].menuIdsJSON.length; k++) {
                        menuItemIds.push(myMenuDays[j].menuIdsJSON[k])
                    }
                }
            }
        }
    }

    // console.log(allIds);

    // get records in batches of 100
    let myIds = [];
    let currentCount = 0;
    let lastValidNextIndex = 0;
    for (let i = 0; i < menuItemIds.length; i++) {
        myIds.push(menuItemIds[i]);
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
    for (let i = lastValidNextIndex; i < menuItemIds.length; i++) {
        myIds.push(menuItemIds[i]);
    }
    const myBatch = await getBatch(myIds);
    myRestaurantsMenuItems = myRestaurantsMenuItems.concat(myBatch)

    // console.log(myRestaurantsMenuItems);
    return myRestaurantsMenuItems;
}

export default getRestaurantsMenuItems