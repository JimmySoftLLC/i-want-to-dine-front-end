const getEntertainmentItemsForRestaurant = (restaurant: { id: any; }, entertainmentItems: string | any[]) => {
    let myNewEntertainmentItems = [];
    for (let i = 0; i < entertainmentItems.length; i++) {
        if (entertainmentItems[i].restaurantId === restaurant.id) {
            myNewEntertainmentItems.push(JSON.parse(JSON.stringify(entertainmentItems[i])))
        }
    }
    return myNewEntertainmentItems;

}

export default getEntertainmentItemsForRestaurant