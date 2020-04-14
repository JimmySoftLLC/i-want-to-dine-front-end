
import deleteMenuDay from './deleteMenuDay';
import getRestaurantMenuDays from './getRestaurantMenuDays';
import putRestaurant from './putRestaurant';
import removeMenuDayFromRestaurant from './removeMenuDayFromRestaurant';
import getRestaurantFromArray from './getRestaurantFromArray';

const deleteMenuDayById = async (menuDayId, restaurantId, associatesRestaurants, idToken, customId) => {
    await deleteMenuDay(menuDayId, idToken, customId)
    let myRestaurant = getRestaurantFromArray(associatesRestaurants, restaurantId)
    myRestaurant = await removeMenuDayFromRestaurant(myRestaurant, menuDayId)
    await putRestaurant(myRestaurant, idToken, customId)
    let myMenuDays = await getRestaurantMenuDays(myRestaurant)
    return myMenuDays;
}

export default deleteMenuDayById