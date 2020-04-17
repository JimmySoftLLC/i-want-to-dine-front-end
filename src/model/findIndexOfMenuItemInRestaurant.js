const findIndexOfMenuItemInRestaurant = (MyMenuItems, myMenuItemId) => {
    for (let i = 0; i < MyMenuItems.length; i++) {
        if (MyMenuItems[i].id === myMenuItemId) {
            return i;
        }
    }
    return -1;
}

export default findIndexOfMenuItemInRestaurant