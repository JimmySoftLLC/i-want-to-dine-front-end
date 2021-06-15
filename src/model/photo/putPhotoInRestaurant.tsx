// search photosJSON for matching src overwrite or insert if does not exist
const putPhotoInRestaurant = (myRestaurant: any, myPhoto: any) => {
    let foundPhoto = false
    for (let i = 0; i < myRestaurant.photosJSON.length; i++) {
        if (myRestaurant.photosJSON[i].src === myPhoto.src) {
            myRestaurant.photosJSON[i] = JSON.parse(JSON.stringify(myPhoto))
            foundPhoto = true;
            break;
        }
    }
    if (!foundPhoto) {
        myRestaurant.photosJSON.push(JSON.parse(JSON.stringify(myPhoto)))
    }
    return myRestaurant;
}

export default putPhotoInRestaurant