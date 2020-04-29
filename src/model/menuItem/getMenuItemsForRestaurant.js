const getMenuItemsForRestaurant = (restaurant, menuItems) => {
    let myNewMenuItems = [];
    for (let i = 0; i < menuItems.length; i++) {
        if (menuItems[i].restaurant === restaurant.restaurantName) {
            myNewMenuItems.push(JSON.parse(JSON.stringify(menuItems[i])))
        }
    }
    return myNewMenuItems;
}

export default getMenuItemsForRestaurant