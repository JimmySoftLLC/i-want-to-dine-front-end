import findIndexOfPhotoInRestaurant from '../photo/findIndexOfPhotoInRestaurant';

const removePhotoFromRestaurant = async (restaurant, mySrc) => {
    let myRestaurant = JSON.parse(JSON.stringify(restaurant))
    let myIndex = findIndexOfPhotoInRestaurant(myRestaurant, mySrc)
    while (myIndex !== -1) {
        myRestaurant.photosJSON.splice(myIndex, 1)
        myIndex = findIndexOfPhotoInRestaurant(myRestaurant, mySrc)
    }
    return myRestaurant;
}

export default removePhotoFromRestaurant;


