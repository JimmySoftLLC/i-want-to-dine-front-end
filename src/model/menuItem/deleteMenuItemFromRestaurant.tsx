import deleteMenuItem from './deleteMenuItem';
import putRestaurant from '../restaurant/putRestaurant';
import getRestaurantById from '../restaurant/getRestaurantById';
import getMenuItems from '../menuItem/getMenuItems';
import removeMenuItemFromIds from './removeMenuItemFromIds';

const deleteMenuItemFromRestaurant = async (menuId: any, restaurantId: any, associatesRestaurants: any, writeRestaurant: any, idToken: any, customId: any) => {
    await deleteMenuItem(menuId, idToken, customId)
    if (writeRestaurant) {
        let myRestaurant = getRestaurantById(associatesRestaurants, restaurantId)
        myRestaurant = await removeMenuItemFromIds(myRestaurant, menuId)
        await putRestaurant(myRestaurant, idToken, customId)
        let myMenuItems = await getMenuItems(myRestaurant.menuItemIdsJSON);
        return myMenuItems
    }
    return null;
}

export default deleteMenuItemFromRestaurant;