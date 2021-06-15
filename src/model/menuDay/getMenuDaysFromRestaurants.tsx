import getMenuDays from './getMenuDaysFromIds';

const getTodaysMenuDays = async (restaurants: any) => {
    // create an array of all ids
    let menuDayIds: any = [];
    let myMenuDays: any = [];

    for (let i = 0; i < restaurants.length; i++) {
        if (restaurants[i].approved) {
            menuDayIds = menuDayIds.concat(restaurants[i].menuDayIdsJSON)
        }
    }

    myMenuDays = await getMenuDays(menuDayIds)

    return myMenuDays;
}

export default getTodaysMenuDays;