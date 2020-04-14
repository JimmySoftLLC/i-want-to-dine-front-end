import deleteMenuItem from './deleteMenuItem';
import getRestaurantMenuItems from './getRestaurantMenuItems';
import putRestaurant from './putRestaurant';
import getRestaurantFromArray from './getRestaurantFromArray';
import removeMenuItemFromRestaurant from './removeMenuItemFromRestaurant';

const deleteMenuItemById = async (menuId, restaurantId, associatesRestaurants, idToken, customId) => {
    await deleteMenuItem(menuId, idToken, customId)
    let myRestaurant = getRestaurantFromArray(associatesRestaurants, restaurantId)
    myRestaurant = await removeMenuItemFromRestaurant(myRestaurant, menuId)
    await putRestaurant(myRestaurant, idToken, customId)
    let myMenuItems = await getRestaurantMenuItems(myRestaurant)
    return myMenuItems
}

export default deleteMenuItemById;