const removeRestaurantFromIds = async (associate, restaurantId) => {
    let myAssociate = JSON.parse(JSON.stringify(associate))
    let myIndex = myAssociate.restaurantIdsJSON.indexOf(restaurantId)
    while (myIndex !== -1) {
        myAssociate.restaurantIdsJSON.splice(myIndex, 1)
        myIndex = myAssociate.restaurantIdsJSON.indexOf(restaurantId)
    }
    return myAssociate;
}

export default removeRestaurantFromIds;