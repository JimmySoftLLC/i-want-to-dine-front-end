const getMenuItemsForRestaurant = (restaurant: any, menuItems: any) => {
    let myNewMenuItems = [];
    for (let i = 0; i < menuItems.length; i++) {
        if (menuItems[i].restaurantId === restaurant.id) {
            myNewMenuItems.push(JSON.parse(JSON.stringify(menuItems[i])))
        }
    }
    return myNewMenuItems;
}

export default getMenuItemsForRestaurant