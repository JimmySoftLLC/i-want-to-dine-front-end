import batchGetItemDynamoDB from '../../api/batchGetItemDynamoDB';

import {
    restaurantsTableName,
    projectionExpressionRestaurant,
    blankPlaceHolder,
} from '../../api/apiConstants';

const getAssociatesRestaurants = async (associate) => {
    let myAssociateRestaurants = []
    let myIds = associate.restaurantIdsJSON
    const data = await batchGetItemDynamoDB(restaurantsTableName, myIds, projectionExpressionRestaurant)
    if (data.err) {
        return [];
    }
    myAssociateRestaurants = data.payload.Responses.restaurants;
    // console.log("my associates restaurants: ", myAssociateRestaurants)
    for (let i = 0; i < myAssociateRestaurants.length; i++) {
        myAssociateRestaurants[i].restaurantName = myAssociateRestaurants[i].restaurantName === blankPlaceHolder ? '' : myAssociateRestaurants[i].restaurantName
        myAssociateRestaurants[i].description = myAssociateRestaurants[i].description === blankPlaceHolder ? '' : myAssociateRestaurants[i].description
        myAssociateRestaurants[i].street = myAssociateRestaurants[i].street === blankPlaceHolder ? '' : myAssociateRestaurants[i].street
        myAssociateRestaurants[i].city = myAssociateRestaurants[i].city === blankPlaceHolder ? '' : myAssociateRestaurants[i].city
        myAssociateRestaurants[i].stateUS = myAssociateRestaurants[i].stateUS === blankPlaceHolder ? '' : myAssociateRestaurants[i].stateUS
        myAssociateRestaurants[i].zipCode = myAssociateRestaurants[i].zipCode === blankPlaceHolder ? '' : myAssociateRestaurants[i].zipCode
        myAssociateRestaurants[i].phoneNumber = myAssociateRestaurants[i].phoneNumber === blankPlaceHolder ? '' : myAssociateRestaurants[i].phoneNumber
        myAssociateRestaurants[i].urlLink = myAssociateRestaurants[i].urlLink === blankPlaceHolder ? '' : myAssociateRestaurants[i].urlLink
        myAssociateRestaurants[i].orderUrlLink = myAssociateRestaurants[i].orderUrlLink === blankPlaceHolder ? '' : myAssociateRestaurants[i].orderUrlLink
        myAssociateRestaurants[i].menuItemIdsJSON = JSON.parse(myAssociateRestaurants[i].menuItemIdsJSON)
        myAssociateRestaurants[i].entertainmentItemIdsJSON = JSON.parse(myAssociateRestaurants[i].entertainmentItemIdsJSON)
        myAssociateRestaurants[i].associatesJSON = JSON.parse(myAssociateRestaurants[i].associatesJSON)
        myAssociateRestaurants[i].photosJSON = JSON.parse(myAssociateRestaurants[i].photosJSON)
        if (myAssociateRestaurants[i].menuDayIdsJSON) {
            myAssociateRestaurants[i].menuDayIdsJSON = JSON.parse(myAssociateRestaurants[i].menuDayIdsJSON)
        } else {
            myAssociateRestaurants[i].menuDayIdsJSON = [];
        }
    }
    return myAssociateRestaurants;
}

export default getAssociatesRestaurants;