const getRestaurantById = (restaurants, restaurantId) => {
    for (let i = 0; i < restaurants.length; i++) {
        if (restaurants[i].id === restaurantId) {
            return restaurants[i];
        }
    }
    return null;
}

export default getRestaurantById