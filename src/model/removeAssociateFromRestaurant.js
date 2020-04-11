import findIndexOfAssociateInRestaurant from './findIndexOfAssociateInRestaurant';

const removeAssociateFromRestaurant = async (myRestaurant, associateId) => {
    let myIndex = findIndexOfAssociateInRestaurant(myRestaurant, associateId)
    while (myIndex !== -1) {
        myRestaurant.associatesJSON.splice(myIndex, 1)
        myIndex = findIndexOfAssociateInRestaurant(myRestaurant, associateId)
    }
    return myRestaurant;
}

export default removeAssociateFromRestaurant;


