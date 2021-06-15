const isAdminInRestaurant = (myRestaurant: any) => {
    for (let i = 0; i < myRestaurant.associatesJSON.length; i++) {
        if (myRestaurant.associatesJSON[i].accessLevel === 'admin') {
            return true;
        }
    }
    return false;
}

export default isAdminInRestaurant