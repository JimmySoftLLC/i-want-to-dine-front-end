const indexOfMenuItemInRestaurant = (myMenuItems: any, myMenuItemId: any) => {
    for (let i = 0; i < myMenuItems.length; i++) {
        if (myMenuItems[i].id === myMenuItemId) {
            return i;
        }
    }
    return -1;
}

export default indexOfMenuItemInRestaurant