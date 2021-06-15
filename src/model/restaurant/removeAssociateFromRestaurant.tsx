import findIndexOfAssociateInRestaurant from '../associate/findIndexOfAssociateInRestaurant';

const removeAssociateFromRestaurant = async (restaurant: any, associateId: any) => {
    let myRestaurant = JSON.parse(JSON.stringify(restaurant))
    let myIndex = findIndexOfAssociateInRestaurant(myRestaurant, associateId)
    while (myIndex !== -1) {
        myRestaurant.associatesJSON.splice(myIndex, 1)
        myIndex = findIndexOfAssociateInRestaurant(myRestaurant, associateId)
    }
    return myRestaurant;
}

export default removeAssociateFromRestaurant;


