import deleteMenuItem from './deleteMenuItem';
import putRestaurant from '../restaurant/putRestaurant';
import getRestaurantFromArray from '../restaurant/getRestaurantFromArray';
import getMenuItems from '../menuItem/getMenuItems';
import removeMenuItemFromIds from './removeMenuItemFromIds';

const deleteMenuItemFromRestaurant = async (menuId, restaurantId, associatesRestaurants, writeRestaurant, idToken, customId) => {
    await deleteMenuItem(menuId, idToken, customId)
    if (writeRestaurant) {
        let myRestaurant = getRestaurantFromArray(associatesRestaurants, restaurantId)
        myRestaurant = await removeMenuItemFromIds(myRestaurant, menuId)
        await putRestaurant(myRestaurant, idToken, customId)
        let myMenuItems = await getMenuItems(myRestaurant.menuItemIdsJSON);
        return myMenuItems
    }
    return null;
}

export default deleteMenuItemFromRestaurant;