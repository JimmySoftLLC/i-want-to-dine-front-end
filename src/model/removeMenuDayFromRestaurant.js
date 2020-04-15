const removeMenuDayFromRestaurant = async (restaurant, menuDayId) => {
    let myRestaurant = JSON.parse(JSON.stringify(restaurant))
    let myIndex = myRestaurant.menuDayIdsJSON.indexOf(menuDayId, 0)
    while (myIndex !== -1) {
        myRestaurant.menuDayIdsJSON.splice(myIndex, 1)
        myIndex = myRestaurant.menuDayIdsJSON.indexOf(menuDayId, 0)
    }
    return myRestaurant;
}

export default removeMenuDayFromRestaurant;