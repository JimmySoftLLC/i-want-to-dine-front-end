const removeMenuItemFromRestaurant = async (myRestaurant, menuId) => {
    let myIndex = myRestaurant.menuItemIdsJSON.indexOf(menuId, 0)
    while (myIndex !== -1) {
        myRestaurant.menuItemIdsJSON.splice(myIndex, 1)
        myIndex = myRestaurant.menuItemIdsJSON.indexOf(menuId, 0)
    }
    return myRestaurant;
}

export default removeMenuItemFromRestaurant;