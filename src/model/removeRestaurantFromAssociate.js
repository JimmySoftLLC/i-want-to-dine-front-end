const removeRestaurantFromAssociate = async (myAssociate, restaurantId) => {
    let myIndex = myAssociate.restaurantIdsJSON.indexOf(restaurantId)
    while (myIndex !== -1) {
        myIndex = myAssociate.restaurantIdsJSON.indexOf(restaurantId)
        myAssociate.restaurantIdsJSON.splice(myIndex, 1)
    }
    return myAssociate;
}

export default removeRestaurantFromAssociate;