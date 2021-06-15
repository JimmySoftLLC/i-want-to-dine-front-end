import putMenuDay from './putMenuDay';
import indexOfEntertainmentItemInRestaurant from '../entertainmentItem/indexOfEntertainmentItemInRestaurant';

const updateMenuDaysWithEntertainmentItemChanges = async (myMenuDays: any, myEntertainmentItems: any, myToken: any, myCustomId: any) => {
    for (let i = 0; i < myMenuDays.length; i++) {
        let myNewMenuIdsJSON = [];
        for (let j = 0; j < myMenuDays[i].entertainmentItemIdsJSON.length; j++) {
            let myIndex = indexOfEntertainmentItemInRestaurant(myEntertainmentItems, myMenuDays[i].entertainmentItemIdsJSON[j]);
            if (myIndex !== -1) {
                myNewMenuIdsJSON.push(myMenuDays[i].entertainmentItemIdsJSON[j])
            }
        }
        if (myNewMenuIdsJSON.length !== myMenuDays[i].entertainmentItemIdsJSON.length) {
            myMenuDays[i].entertainmentItemIdsJSON = myNewMenuIdsJSON;
            await putMenuDay(myMenuDays[i], myToken, myCustomId);
        }
    }
    return myMenuDays
}

export default updateMenuDaysWithEntertainmentItemChanges