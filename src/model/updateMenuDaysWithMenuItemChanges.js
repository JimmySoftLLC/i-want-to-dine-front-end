import putMenuDay from './putMenuDay';
import findIndexOfMenuItem from './findIndexOfMenuItem';

const updateMenuDaysWithMenuItemChanges = async (myMenuDays, myMenuItems, myToken, myCustomId) => {
    for (let i = 0; i < myMenuDays.length; i++) {
        let myNewMenuIdsJSON = [];
        for (let j = 0; j < myMenuDays[i].menuIdsJSON.length; j++) {
            let myIndex = findIndexOfMenuItem(myMenuItems, myMenuDays[i].menuIdsJSON[j]);
            if (myIndex !== -1) {
                myNewMenuIdsJSON.push(myMenuDays[i].menuIdsJSON[j])
            }
        }
        if (myNewMenuIdsJSON.length !== myMenuDays[i].menuIdsJSON.length) {
            myMenuDays[i].menuIdsJSON = myNewMenuIdsJSON;
            await putMenuDay(myMenuDays[i], myToken, myCustomId);
        }
    }
    return myMenuDays
}

export default updateMenuDaysWithMenuItemChanges