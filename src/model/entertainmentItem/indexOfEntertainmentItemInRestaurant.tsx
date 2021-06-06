const indexOfEntertainmentItemInRestaurant = (myEntertainmentItems: string | any[], myEntertainmentItemId: any) => {
    for (let i = 0; i < myEntertainmentItems.length; i++) {
        if (myEntertainmentItems[i].id === myEntertainmentItemId) {
            return i;
        }
    }
    return -1;
}

export default indexOfEntertainmentItemInRestaurant