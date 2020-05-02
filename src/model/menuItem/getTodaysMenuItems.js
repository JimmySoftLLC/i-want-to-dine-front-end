import getMenuItems from './getMenuItems';
import validDate from '../validDate';

const getTodaysMenuItems = async (myMenuDays) => {
    // create an array of all ids
    let menuItemIds = [];
    let myMenuItems = [];
    let myDateNow = new Date();

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

export default getTodaysMenuItems;