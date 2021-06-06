const getPhotoFromRestaurant = (restaurant, mySrc) => {
    let myRestaurant = JSON.parse(JSON.stringify(restaurant));
    for (let i = 0; i < myRestaurant.photosJSON.length; i++) {
        if (myRestaurant.photosJSON[i].id === mySrc) {
            return myRestaurant.photosJSON[i];
        }
    }
    return null;
}

export default getPhotoFromRestaurant