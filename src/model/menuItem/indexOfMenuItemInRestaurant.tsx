const indexOfMenuItemInRestaurant = (myMenuItems, myMenuItemId) => {
    for (let i = 0; i < myMenuItems.length; i++) {
        if (myMenuItems[i].id === myMenuItemId) {
            return i;
        }
    }
    return -1;
}

export default indexOfMenuItemInRestaurant