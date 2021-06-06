const removeEntertainmentItemFromIds = async (restaurant: any, entertainmentId: any) => {
    let myRestaurant = JSON.parse(JSON.stringify(restaurant))
    let myIndex = myRestaurant.entertainmentItemIdsJSON.indexOf(entertainmentId, 0)
    while (myIndex !== -1) {
        myRestaurant.entertainmentItemIdsJSON.splice(myIndex, 1)
        myIndex = myRestaurant.entertainmentItemIdsJSON.indexOf(entertainmentId, 0)
    }
    return myRestaurant;
}

export default removeEntertainmentItemFromIds;