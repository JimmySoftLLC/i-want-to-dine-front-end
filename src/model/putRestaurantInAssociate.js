// search restaurantIdsJSON for matching id overwrite or insert if does not exist
const putRestaurantInAssociate = (myAssociate, restaurantId) => {
    let foundRestaurant = false
    for (let i = 0; i < myAssociate.restaurantIdsJSON.length; i++) {
        if (myAssociate.restaurantIdsJSON[i] === restaurantId) {
            foundRestaurant = true;
            break;
        }
    }
    if (!foundRestaurant) {
        myAssociate.restaurantIdsJSON.push(restaurantId)
    }
    return myAssociate;
}

export default putRestaurantInAssociate