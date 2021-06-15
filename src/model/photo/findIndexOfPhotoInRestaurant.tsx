const findIndexOfPhotoInRestaurant = (myRestaurant: any, mySrc: any) => {
    for (let i = 0; i < myRestaurant.photosJSON.length; i++) {
        if (myRestaurant.photosJSON[i].src === mySrc) {
            return i;
        }
    }
    return -1;
}

export default findIndexOfPhotoInRestaurant