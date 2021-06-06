
import deleteMenuDay from './deleteMenuDay';
import getMenuDays from './getMenuDaysFromIds';
import putRestaurant from '../restaurant/putRestaurant';
import removeMenuDayFromIds from './removeMenuDayFromRestaurant';
import getRestaurantById from '../restaurant/getRestaurantById';

const deleteMenuDayFromRestaurant = async (menuDayId, restaurantId, associatesRestaurants, writeRestaurant, idToken, customId) => {
    await deleteMenuDay(menuDayId, idToken, customId)
    if (writeRestaurant) {
        let myRestaurant = getRestaurantById(associatesRestaurants, restaurantId)
        myRestaurant = await removeMenuDayFromIds(myRestaurant, menuDayId)
        await putRestaurant(myRestaurant, idToken, customId)
        let myMenuDays = await getMenuDays(myRestaurant.menuDayIdsJSON)
        return myMenuDays;
    }
    return null;
}

export default deleteMenuDayFromRestaurant