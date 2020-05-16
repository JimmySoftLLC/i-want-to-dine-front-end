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
    let myInDateEntertainmentItems = { body: [], debug: "" };

    let myDateNow = new Date();
    myInDateEntertainmentItems.debug = myInDateEntertainmentItems.debug + "Ignore debug messages below\n";
    myInDateEntertainmentItems.debug = myInDateEntertainmentItems.debug + "Now: " + myDateNow + "\n";

    for (let j = 0; j < myEntertainmentItems.length; j++) {
        let myFromDate = new Date(dateString(myEntertainmentItems[j].timeFrom, null, 'saveToDatabaseFromDate'))
        // let myToDate = new Date(dateString(myEntertainmentItems[j].timeTo, null, 'saveToDatabaseToDate'))
        // let myFromDate = myEntertainmentItems[j].timeFrom;
        let myToDate = myEntertainmentItems[j].timeTo;
        console.log(myDateNow, myFromDate, myToDate)
        myInDateEntertainmentItems.debug = myInDateEntertainmentItems.debug + "From: " + myFromDate + "\n";
        myInDateEntertainmentItems.debug = myInDateEntertainmentItems.debug + "To: " + myToDate + "\n";
        if (validDate(myFromDate, myToDate, myDateNow)) {
            myInDateEntertainmentItems.body.push(myEntertainmentItems[j])
        }
    }

    return myInDateEntertainmentItems;
}

export default getTodaysEntertainmentItems;