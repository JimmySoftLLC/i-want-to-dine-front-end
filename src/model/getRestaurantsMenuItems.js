import batchGetItemDynamoDB from '../api/batchGetItemDynamoDB';

import {
    menuItemsTableName,
    projectionExpressionMenuItem,
} from '../api/apiConstants';

const getRestaurantsMenuItems = async (associate, myToken, myCustomId) => {
    let myRestaurantsMenuItems = []
    let myIds = associate.restaurantIdsJSON
    const data = await batchGetItemDynamoDB(menuItemsTableName, 'id', myToken, myIds, myCustomId, projectionExpressionMenuItem)
    // console.log(data);
    if (data.err) {
        return [];
    }
    myRestaurantsMenuItems = data.payload.Responses.restaurants;
    // console.log("my associates restaurants: ", myAssociateRestaurants)
    for (let i = 0; i < myRestaurantsMenuItems.length; i++) {
        myRestaurantsMenuItems[i].menuItemIdsJSON = JSON.parse(myRestaurantsMenuItems[i].menuItemIdsJSON)
    }
    for (let i = 0; i < myRestaurantsMenuItems.length; i++) {
        myRestaurantsMenuItems[i].associateIdsJSON = JSON.parse(myRestaurantsMenuItems[i].associateIdsJSON)
    }
    return myRestaurantsMenuItems;
}

export default getRestaurantsMenuItems