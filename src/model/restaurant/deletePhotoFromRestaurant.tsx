import removePhotoFromRestaurant from './removePhotoFromRestaurant';
import deleteImageAPI from '../images/deleteImageAPI';

const deletePhotoFromRestaurant = async (mySrc: any, restaurant: any, idToken: any, customId: any) => {
    let myRestaurant = JSON.parse(JSON.stringify(restaurant))
    myRestaurant = await removePhotoFromRestaurant(myRestaurant, mySrc)
    await deleteImageAPI(mySrc, idToken, customId)
    return myRestaurant;
}

export default deletePhotoFromRestaurant