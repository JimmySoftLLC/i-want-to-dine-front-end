const getEntertainmentItemsForRestaurant = (restaurant, entertainmentItems) => {
    let myNewEntertainmentItems = [];
    for (let i = 0; i < entertainmentItems.length; i++) {
        if (entertainmentItems[i].restaurant === restaurant.restaurantName) {
            myNewEntertainmentItems.push(JSON.parse(JSON.stringify(entertainmentItems[i])))
        }
    }
    return myNewEntertainmentItems;
}

export default getEntertainmentItemsForRestaurant