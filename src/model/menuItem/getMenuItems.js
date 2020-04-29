import batchGetItemDynamoDB from '../../api/batchGetItemDynamoDB';

import {
    menuItemsTableName,
    projectionExpressionMenuItem,
    blankPlaceHolder,
} from '../../api/apiConstants';

const getBatch = async (myIds) => {
    let myMenuItems = []
    const data = await batchGetItemDynamoDB(menuItemsTableName, myIds, projectionExpressionMenuItem)
    if (data.err) {
        return [];
    }
    myMenuItems = data.payload.Responses.menuItems;
    for (let i = 0; i < myMenuItems.length; i++) {
        myMenuItems[i].title = myMenuItems[i].title === blankPlaceHolder ? '' : myMenuItems[i].title
        myMenuItems[i].description = myMenuItems[i].description === blankPlaceHolder ? '' : myMenuItems[i].description
        myMenuItems[i].restaurant = myMenuItems[i].restaurant === blankPlaceHolder ? '' : myMenuItems[i].restaurant
        myMenuItems[i].categoryJSON = JSON.parse(myMenuItems[i].categoryJSON)
    }
    return myMenuItems;
}

const getMenuItems = async (menuItemIds) => {
    // get records in batches of 100
    let myIds = [];
    let currentIndex = 0;
    let nextIndex = 0;
    let myMenuItems = []
    for (let i = 0; i < menuItemIds.length; i++) {
        myIds.push(menuItemIds[i]);
        currentIndex++;
        if (currentIndex > 99) {
            const myBatch = await getBatch(myIds);
            myIds = [];
            currentIndex = 0
            myMenuItems = myMenuItems.concat(myBatch)
            nextIndex = i + 1;
        }
    }

    // get any leftover records
    myIds = [];
    for (let i = nextIndex; i < menuItemIds.length; i++) {
        myIds.push(menuItemIds[i]);
    }
    const myBatch = await getBatch(myIds);
    myMenuItems = myMenuItems.concat(myBatch)

    // console.log(myMenuItems);
    return myMenuItems;
}

export default getMenuItems