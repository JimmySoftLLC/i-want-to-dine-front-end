const getAssociateFromRestaurant = (restaurant, associateId) => {
    let myRestaurant = JSON.parse(JSON.stringify(restaurant));
    for (let i = 0; i < myRestaurant.associatesJSON.length; i++) {
        if (myRestaurant.associatesJSON[i].id === associateId) {
            return myRestaurant.associatesJSON[i];
        }
    }
    return null;
}

export default getAssociateFromRestaurant