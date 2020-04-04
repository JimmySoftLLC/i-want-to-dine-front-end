const getAssociateFromRestaurant = (restaurant, associateId) => {
    for (let i = 0; i < restaurant.associatesJSON.length; i++) {
        if (restaurant.associatesJSON[i].id === associateId) {
            return restaurant.associatesJSON[i];
        }
    }
    return null;
}

export default getAssociateFromRestaurant