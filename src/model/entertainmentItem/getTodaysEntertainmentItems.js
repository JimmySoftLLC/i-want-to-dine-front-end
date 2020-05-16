import getEntertainmentItems from './getEntertainmentItems';
import validDate from '../validDate';

const getTodaysEntertainmentItems = async (restaurants) => {
    // create an array of all ids
    let entertainmentItemsIds = [];
    let myEntertainmentItems = [];

    for (let i = 0; i < restaurants.length; i++) {
        if (restaurants[i].approved) {
            entertainmentItemsIds = entertainmentItemsIds.concat(restaurants[i].entertainmentItemIdsJSON)
        }
    }

    myEntertainmentItems = await getEntertainmentItems(entertainmentItemsIds)
    let myInDateEntertainmentItems = [];

    let myDateNow = new Date();

    for (let j = 0; j < myEntertainmentItems.length; j++) {
        let myFromDate = myEntertainmentItems[j].timeFrom;
        let myToDate = myEntertainmentItems[j].timeTo;
        if (validDate(myFromDate, myToDate, myDateNow)) {
            myInDateEntertainmentItems.push(myEntertainmentItems[j])
        }
    }

    return myInDateEntertainmentItems;
}

export default getTodaysEntertainmentItems;