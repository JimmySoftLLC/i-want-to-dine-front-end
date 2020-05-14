import getEntertainmentItems from './getEntertainmentItems';
import validDate from '../validDate';
import dateString from '../dateString';

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

    let myDateNow = new Date();

    let myInDateEntertainmentItems = [];

    for (let j = 0; j < myEntertainmentItems.length; j++) {
        let myFromDate = new Date(dateString(myEntertainmentItems[j].timeFrom, null, 'saveToDatabaseFromDate'))
        let myToDate = new Date(dateString(myEntertainmentItems[j].timeTo, null, 'saveToDatabaseToDate'))
        console.log(myDateNow, myFromDate, myToDate)
        if (validDate(myFromDate, myToDate, myDateNow)) {
            myInDateEntertainmentItems.push(myEntertainmentItems[j])
        }
    }

    return myInDateEntertainmentItems;
}

export default getTodaysEntertainmentItems;