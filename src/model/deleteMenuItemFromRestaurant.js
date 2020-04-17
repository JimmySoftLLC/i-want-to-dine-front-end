import deleteMenuItem from './deleteMenuItem';
import getRestaurantMenuItems from './getRestaurantMenuItems';
import putRestaurant from './putRestaurant';
import getRestaurantFromArray from './getRestaurantFromArray';
import removeMenuItemFromRestaurant from './removeMenuItemFromRestaurant';

const deleteMenuItemFromRestaurant = async (menuId, restaurantId, associatesRestaurants, writeRestaurant, idToken, customId) => {
    await deleteMenuItem(menuId, idToken, customId)
    if (writeRestaurant) {
        let myRestaurant = getRestaurantFromArray(associatesRestaurants, restaurantId)
        myRestaurant = await removeMenuItemFromRestaurant(myRestaurant, menuId)
        await putRestaurant(myRestaurant, idToken, customId)
        let myMenuItems = await getRestaurantMenuItems(myRestaurant)
        return myMenuItems
    }
    return null;
}

export default deleteMenuItemFromRestaurant;