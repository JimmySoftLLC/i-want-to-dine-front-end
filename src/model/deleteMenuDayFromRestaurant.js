
import deleteMenuDay from './deleteMenuDay';
import getRestaurantMenuDays from './getRestaurantMenuDays';
import putRestaurant from './putRestaurant';
import removeMenuDayFromRestaurant from './removeMenuDayFromRestaurant';
import getRestaurantFromArray from './getRestaurantFromArray';

const deleteMenuDayFromRestaurant = async (menuDayId, restaurantId, associatesRestaurants, writeRestaurant, idToken, customId) => {
    await deleteMenuDay(menuDayId, idToken, customId)
    if (writeRestaurant) {
        let myRestaurant = getRestaurantFromArray(associatesRestaurants, restaurantId)
        myRestaurant = await removeMenuDayFromRestaurant(myRestaurant, menuDayId)
        await putRestaurant(myRestaurant, idToken, customId)
        let myMenuDays = await getRestaurantMenuDays(myRestaurant)
        return myMenuDays;
    }
    return null;
}

export default deleteMenuDayFromRestaurant