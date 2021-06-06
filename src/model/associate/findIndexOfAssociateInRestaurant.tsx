const findIndexOfAssociateInRestaurant = (myRestaurant: { associatesJSON: string | any[]; }, myAssociateId: any) => {
    for (let i = 0; i < myRestaurant.associatesJSON.length; i++) {
        if (myRestaurant.associatesJSON[i].id === myAssociateId) {
            return i;
        }
    }
    return -1;
}

export default findIndexOfAssociateInRestaurant