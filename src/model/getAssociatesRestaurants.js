import batchGetItemDynamoDB from '../api/batchGetItemDynamoDB';

import {
    restaurantTableName,
    projectionExpressionRestaurant,
} from '../api/apiConstants';

const getAssociatesRestaurants = async (associate, myToken, myCustomId) => {
    // console.log(associate, myToken, myCustomId);
    let myAssociateRestaurants = []
    let myIds = associate.restaurantIdsJSON
    const data = await batchGetItemDynamoDB(restaurantTableName, myToken, myIds, myCustomId, projectionExpressionRestaurant)
    // console.log(data);
    if (data.err) {
        return [];
    }
    myAssociateRestaurants = data.payload.Responses.restaurants;
    for (let i = 0; i < myAssociateRestaurants.length; i++) {
        myAssociateRestaurants[i].menuItemIdsJSON = JSON.parse(myAssociateRestaurants[i].menuItemIdsJSON)
    }
    for (let i = 0; i < myAssociateRestaurants.length; i++) {
        myAssociateRestaurants[i].associateIdsJSON = JSON.parse(myAssociateRestaurants[i].associateIdsJSON)
    }
    //console.log(myAssociateRestaurants)
    return myAssociateRestaurants;

}

export default getAssociatesRestaurants