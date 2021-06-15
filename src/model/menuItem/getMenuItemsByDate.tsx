import getMenuItems from './getMenuItems';
import validDate from '../validDate';

const getTodaysMenuItems = async (myMenuDays: any, selectedDate: any) => {
    // create an array of all ids
    let menuItemIds = [];
    let myMenuItems = [];

    for (let j = 0; j < myMenuDays.length; j++) {
        if (validDate(myMenuDays[j].dateFrom, myMenuDays[j].dateTo, selectedDate)) {
            for (let k = 0; k < myMenuDays[j].menuItemIdsJSON.length; k++) {
                menuItemIds.push(myMenuDays[j].menuItemIdsJSON[k])
            }
        }
    }
    myMenuItems = await getMenuItems(menuItemIds)

    return myMenuItems;
}

export default getTodaysMenuItems;