import batchGetItemDynamoDB from '../../api/batchGetItemDynamoDB';

import {
    menuDaysTableName,
    projectionExpressionMenuDay,
    blankPlaceHolder,
} from '../../api/apiConstants';

const getBatch = async (myIds: any) => {
    let myMenuDays = []
    const data = await batchGetItemDynamoDB(menuDaysTableName, myIds, projectionExpressionMenuDay)
    if (data.err) {
        return [];
    }

    myMenuDays = data.payload.Responses.menuDays;
    for (let i = 0; i < myMenuDays.length; i++) {
        myMenuDays[i].title = myMenuDays[i].title === blankPlaceHolder ? '' : myMenuDays[i].title
        myMenuDays[i].description = myMenuDays[i].description === blankPlaceHolder ? '' : myMenuDays[i].description
        myMenuDays[i].menuItemIdsJSON = JSON.parse(myMenuDays[i].menuItemIdsJSON)
        myMenuDays[i].entertainmentItemIdsJSON = JSON.parse(myMenuDays[i].entertainmentItemIdsJSON)
        myMenuDays[i].associatesJSON = JSON.parse(myMenuDays[i].associatesJSON)
        myMenuDays[i].dateFrom = new Date(myMenuDays[i].dateFrom)
        myMenuDays[i].dateTo = new Date(myMenuDays[i].dateTo)
    }

    return myMenuDays;
}

const getMenuDays = async (menuDaysIds: any) => {
    if (menuDaysIds.length === 0) { return [] }
    // console.log(restaurant);
    let myMenuDays: any = [];

    // get records in batches of 100
    let myIds = [];
    let currentIndex = 0;
    let nextIndex = 0;
    for (let i = 0; i < menuDaysIds.length; i++) {
        myIds.push(menuDaysIds[i]);
        currentIndex++;
        if (currentIndex > 99) {
            const myBatch = await getBatch(myIds);
            myIds = [];
            currentIndex = 0
            myMenuDays = myMenuDays.concat(myBatch)
            nextIndex = i + 1;
        }
    }

    // get any leftover records
    myIds = [];
    for (let i = nextIndex; i < menuDaysIds.length; i++) {
        myIds.push(menuDaysIds[i]);
    }
    const myBatch = await getBatch(myIds);
    myMenuDays = myMenuDays.concat(myBatch)

    //console.log(myRestaurantMenuDays);
    return myMenuDays;
}

export default getMenuDays