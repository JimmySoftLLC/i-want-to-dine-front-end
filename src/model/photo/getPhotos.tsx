const getPhotos = async (restaurants: any) => {
    // create an array of all ids
    let myPhotos = [];
    for (let i = 0; i < restaurants.length; i++) {
        if (restaurants[i].approved) {
            for (let j = 0; j < restaurants[i].photosJSON.length; j++) {
                myPhotos.push(restaurants[i].photosJSON[j])
            }
        }
    }
    return myPhotos;
}

export default getPhotos;