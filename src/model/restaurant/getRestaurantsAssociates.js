import getMenuDays from '../menuDay/getMenuDays';
import getAssociates from '../associate/getAssociates';
import validDate from '../validDate';

const getRestaurantsAssociates = async (restaurants) => {
    // create an array of all ids
    let menuDayIds = [];
    let myMenuDays = [];
    let associateIds = [];
    let myAssociates = [];
    let myDateNow = new Date();

    for (let i = 0; i < restaurants.length; i++) {
        if (restaurants[i].approved) {
            menuDayIds = menuDayIds.concat(restaurants[i].menuDayIdsJSON)
        }
    }

    myMenuDays = await getMenuDays(menuDayIds)

    for (let j = 0; j < myMenuDays.length; j++) {
        if (validDate(myMenuDays[j].dateFrom, myMenuDays[j].dateTo, myDateNow)) {
            for (let k = 0; k < myMenuDays[j].associatesJSON.length; k++) {
                if (associateIds.indexOf(myMenuDays[j].associatesJSON[k]) === -1) {
                    associateIds.push(myMenuDays[j].associatesJSON[k])
                }
            }
        }
    }

    myAssociates = await getAssociates(associateIds)

    return myAssociates;
}

export default getRestaurantsAssociates;