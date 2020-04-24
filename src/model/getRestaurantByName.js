const getRestaurantByName = (restaurants, restaurantName) => {
    for (let i = 0; i < restaurants.length; i++) {
        if (restaurants[i].restaurantName === restaurantName) {
            return restaurants[i];
        }
    }
    return null;
}

export default getRestaurantByName