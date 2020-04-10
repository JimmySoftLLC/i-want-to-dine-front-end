import checkIfOneAdminInRestaurant from './checkIfOneAdminInRestaurant';

const testPutAssociateInRestaurant = (restaurant, myAssociate) => {
    let myRestaurant = JSON.parse(JSON.stringify(restaurant))
    let foundAssociate = false
    for (let i = 0; i < myRestaurant.associatesJSON.length; i++) {
        if (myRestaurant.associatesJSON[i].id === myAssociate.id) {
            myRestaurant.associatesJSON[i] = JSON.parse(JSON.stringify(myAssociate))
            foundAssociate = true;
            break;
        }
    }
    if (!foundAssociate) {
        myRestaurant.associatesJSON.push(JSON.parse(JSON.stringify(myAssociate)))
    }

    return checkIfOneAdminInRestaurant(myRestaurant);
}

export default testPutAssociateInRestaurant