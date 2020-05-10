import getEntertainmentItems from './getEntertainmentItems';
import validDate from '../validDate';

const getTodaysEntertainmentItems = async (myMenuDays) => {
    // create an array of all ids
    let entertainmentItemIds = [];
    let myEntertainmentItems = [];
    let myDateNow = new Date();

    for (let j = 0; j < myMenuDays.length; j++) {
        if (validDate(myMenuDays[j].dateFrom, myMenuDays[j].dateTo, myDateNow)) {
            for (let k = 0; k < myMenuDays[j].entertainmentIdsJSON.length; k++) {
                entertainmentItemIds.push(myMenuDays[j].entertainmentIdsJSON[k])
            }
        }
    }
    myEntertainmentItems = await getEntertainmentItems(entertainmentItemIds)

    return myEntertainmentItems;
}

export default getTodaysEntertainmentItems;