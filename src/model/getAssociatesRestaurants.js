import batchGetItemDynamoDB from '../api/batchGetItemDynamoDB';

import {
    restaurantsTableName,
    projectionExpressionRestaurant,
} from '../api/apiConstants';

const getAssociatesRestaurants = async (associate, myToken, myCustomId) => {
    let myAssociateRestaurants = []
    let myIds = associate.restaurantIdsJSON
    const data = await batchGetItemDynamoDB(restaurantsTableName, myToken, myIds, myCustomId, projectionExpressionRestaurant)
    // console.log(data);
    if (data.err) {
        return [];
    }
    myAssociateRestaurants = data.payload.Responses.restaurants;
    // console.log("my associates restaurants: ", myAssociateRestaurants)
    for (let i = 0; i < myAssociateRestaurants.length; i++) {
        myAssociateRestaurants[i].menuItemIdsJSON = JSON.parse(myAssociateRestaurants[i].menuItemIdsJSON)
    }
    for (let i = 0; i < myAssociateRestaurants.length; i++) {
        myAssociateRestaurants[i].associateIdsJSON = JSON.parse(myAssociateRestaurants[i].associateIdsJSON)
    }
    return myAssociateRestaurants;
}

export default getAssociatesRestaurants