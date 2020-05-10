const indexOfEntertainmentItemInRestaurant = (myEntertainmentItems, myEntertainmentItemId) => {
    for (let i = 0; i < myEntertainmentItems.length; i++) {
        if (myEntertainmentItems[i].id === myEntertainmentItemId) {
            return i;
        }
    }
    return -1;
}

export default indexOfEntertainmentItemInRestaurant