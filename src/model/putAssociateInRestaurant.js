// search associatesJSON for matching id overwrite or insert if does not exist
const putAssociateInRestaurant = (restaurant, associate) => {
    let foundAssociate = false
    for (let i = 0; i < restaurant.associatesJSON.length; i++) {
        if (restaurant.associatesJSON[i].id === associate.id) {
            restaurant.associatesJSON[i] = JSON.parse(JSON.stringify(associate))
            foundAssociate = true;
            break;
        }
    }
    if (!foundAssociate) {
        restaurant.associatesJSON.push(JSON.parse(JSON.stringify(associate)))
    }
    return restaurant;
}

export default putAssociateInRestaurant