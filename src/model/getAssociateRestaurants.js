import batchGetItemDynamoDB from '../api/batchGetItemDynamoDB';

import {
    restaurantsTableName,
    projectionExpressionRestaurant,
} from '../api/apiConstants';

const getAssociateRestaurants = async (associate) => {
    let myAssociateRestaurants = []
    let myIds = associate.restaurantIdsJSON
    const data = await batchGetItemDynamoDB(restaurantsTableName, myIds, projectionExpressionRestaurant)
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
    for (let i = 0; i < myAssociateRestaurants.length; i++) {
        if (myAssociateRestaurants[i].menuDayIdsJSON) {
            myAssociateRestaurants[i].menuDayIdsJSON = JSON.parse(myAssociateRestaurants[i].menuDayIdsJSON)
        } else {
            myAssociateRestaurants[i].menuDayIdsJSON = [];
        }
    }
    return myAssociateRestaurants;
}

export default getAssociateRestaurants;