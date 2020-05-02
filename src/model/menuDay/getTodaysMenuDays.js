import getMenuDays from './getMenuDays';

const getTodaysMenuDays = async (restaurants) => {
    // create an array of all ids
    let menuDayIds = [];
    let myMenuDays = [];

    for (let i = 0; i < restaurants.length; i++) {
        if (restaurants[i].approved) {
            menuDayIds = menuDayIds.concat(restaurants[i].menuDayIdsJSON)
        }
    }

    myMenuDays = await getMenuDays(menuDayIds)

    return myMenuDays;
}

export default getTodaysMenuDays;