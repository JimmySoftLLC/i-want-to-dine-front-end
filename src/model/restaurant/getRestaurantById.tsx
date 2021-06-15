const getRestaurantById = (restaurants: any, restaurantId: any) => {
    for (let i = 0; i < restaurants.length; i++) {
        if (restaurants[i].id === restaurantId) {
            return restaurants[i];
        }
    }
    return null;
}

export default getRestaurantById