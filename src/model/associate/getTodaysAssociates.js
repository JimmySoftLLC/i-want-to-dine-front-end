import getAssociates from './getAssociates';
import getAssociateFromRestaurant from './getAssociateFromRestaurant';
import validDate from '../validDate';
import validEmail from '../validEmail';

const getTodaysAssociates = async (restaurants, myMenuDays) => {
    // create an array of all ids
    let associateIds = [];
    let associateIdsNoEmail = [];
    let myAssociates = [];
    let myAssociatesNoEmail = [];
    let myDateNow = new Date();

    for (let j = 0; j < myMenuDays.length; j++) {
        if (validDate(myMenuDays[j].dateFrom, myMenuDays[j].dateTo, myDateNow)) {
            for (let k = 0; k < myMenuDays[j].associatesJSON.length; k++) {
                if (validEmail(myMenuDays[j].associatesJSON[k])) {
                    if (associateIds.indexOf(myMenuDays[j].associatesJSON[k]) === -1) {
                        associateIds.push(myMenuDays[j].associatesJSON[k])
                    }
                } else {
                    if (associateIdsNoEmail.indexOf(myMenuDays[j].associatesJSON[k]) === -1) {
                        associateIdsNoEmail.push(myMenuDays[j].associatesJSON[k])
                    }
                }
            }
        }
    }

    myAssociates = await getAssociates(associateIds)

    for (let i = 0; i < associateIdsNoEmail.length; i++) {
        for (let j = 0; j < restaurants.length; j++) {
            let associateNoEmail = getAssociateFromRestaurant(restaurants[j], associateIdsNoEmail[i])
            if (associateNoEmail) {
                myAssociatesNoEmail.push(associateNoEmail)
                break;
            }
        }
    }

    myAssociates = myAssociates.concat(myAssociatesNoEmail)

    return myAssociates;
}

export default getTodaysAssociates;