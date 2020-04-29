import getMenuDays from '../menuDay/getMenuDays';
import getMenuItems from '../menuItem/getMenuItems';
import validDate from '../validDate';

const getRestaurantsMenuItems = async (restaurants) => {
    // create an array of all ids
    let menuItemIds = [];
    let menuDayIds = [];
    let myMenuItems = [];
    let myMenuDays = {};
    let myDateNow = new Date();

    for (let i = 0; i < restaurants.length; i++) {
        if (restaurants[i].approved) {
            menuDayIds = menuDayIds.concat(restaurants[i].menuDayIdsJSON)
        }
    }

    myMenuDays = await getMenuDays(menuDayIds)

    for (let j = 0; j < myMenuDays.length; j++) {
        if (validDate(myMenuDays[j].dateFrom, myMenuDays[j].dateTo, myDateNow)) {
            for (let k = 0; k < myMenuDays[j].menuIdsJSON.length; k++) {
                menuItemIds.push(myMenuDays[j].menuIdsJSON[k])
            }
        }
    }

    myMenuItems = await getMenuItems(menuItemIds)

    return myMenuItems;
}

export default getRestaurantsMenuItems;