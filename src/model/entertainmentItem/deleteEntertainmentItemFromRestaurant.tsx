import deleteEntertainmentItem from './deleteEntertainmentItem';
import putRestaurant from '../restaurant/putRestaurant';
import getRestaurantById from '../restaurant/getRestaurantById';
import getEntertainmentItems from './getEntertainmentItems';
import removeEntertainmentItemFromIds from './removeEntertainmentItemFromIds';

const deleteEntertainmentItemFromRestaurant = async (entertainmentItemId: any, restaurantId: any, associatesRestaurants: any, writeRestaurant: boolean, idToken: any, customId: any) => {
    await deleteEntertainmentItem(entertainmentItemId, idToken, customId)
    if (writeRestaurant) {
        let myRestaurant = getRestaurantById(associatesRestaurants, restaurantId)
        myRestaurant = await removeEntertainmentItemFromIds(myRestaurant, entertainmentItemId)
        await putRestaurant(myRestaurant, idToken, customId)
        let myEntertainmentItems = await getEntertainmentItems(myRestaurant.entertainmentItemIdsJSON);
        return myEntertainmentItems
    }
    return null;
}

export default deleteEntertainmentItemFromRestaurant;