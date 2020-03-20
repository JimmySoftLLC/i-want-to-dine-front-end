import batchGetItemDynamoDB from '../api/batchGetItemDynamoDB';

import {
    menuItemsTableName,
    projectionExpressionMenuItem,
} from '../api/apiConstants';

const getRestaurantsMenuItems = async (restaurant, myToken, myCustomId) => {
    let myRestaurantsMenuItems = []
    let myIds = restaurant.menuItemIdsJSON
    const data = await batchGetItemDynamoDB(menuItemsTableName, myToken, myIds, myCustomId, projectionExpressionMenuItem)
    // console.log(data);
    if (data.err) {
        return [];
    }
    myRestaurantsMenuItems = data.payload.Responses.menuItems;
    for (let i = 0; i < myRestaurantsMenuItems.length; i++) {
        myRestaurantsMenuItems[i].categoryJSON = JSON.parse(myRestaurantsMenuItems[i].categoryJSON)
    }
    return myRestaurantsMenuItems;
}

export default getRestaurantsMenuItems