const removeRestaurantFromAssociate = async (myAssociate, restaurantId) => {
    let myIndex = myAssociate.restaurantIdsJSON.indexOf(restaurantId)
    while (myIndex !== -1) {
        myAssociate.restaurantIdsJSON.splice(myIndex, 1)
        myIndex = myAssociate.restaurantIdsJSON.indexOf(restaurantId)
    }
    return myAssociate;
}

export default removeRestaurantFromAssociate;