import deleteEntertainmentItem from './deleteEntertainmentItem';
import putRestaurant from '../restaurant/putRestaurant';
import getRestaurantFromArray from '../restaurant/getRestaurantFromArray';
import getEntertainmentItems from '../entertainmentItem/getEntertainmentItems';
import removeEntertainmentItemFromIds from './removeEntertainmentItemFromIds';

const deleteEntertainmentItemFromRestaurant = async (entertainmentItemId, restaurantId, associatesRestaurants, writeRestaurant, idToken, customId) => {
    await deleteEntertainmentItem(entertainmentItemId, idToken, customId)
    if (writeRestaurant) {
        let myRestaurant = getRestaurantFromArray(associatesRestaurants, restaurantId)
        myRestaurant = await removeEntertainmentItemFromIds(myRestaurant, entertainmentItemId)
        await putRestaurant(myRestaurant, idToken, customId)
        let myEntertainmentItems = await getEntertainmentItems(myRestaurant.entertainmentItemIdsJSON);
        return myEntertainmentItems
    }
    return null;
}

export default deleteEntertainmentItemFromRestaurant;