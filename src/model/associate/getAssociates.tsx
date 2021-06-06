import batchGetItemDynamoDB from '../../api/batchGetItemDynamoDB';

import {
    associatesTableName,
    projectionExpressionAssociate,
    blankPlaceHolder,
} from '../../api/apiConstants';

const getBatch = async (myIds: any[]) => {
    let myAssociates = []
    const data = await batchGetItemDynamoDB(associatesTableName, myIds, projectionExpressionAssociate)
    if (data.err) {
        return [];
    }
    myAssociates = data.payload.Responses.associates;
    for (let i = 0; i < myAssociates.length; i++) {
        myAssociates[i].firstName = myAssociates[i].firstName === blankPlaceHolder ? '' : myAssociates[i].firstName
        myAssociates[i].lastName = myAssociates[i].lastName === blankPlaceHolder ? '' : myAssociates[i].lastName
        myAssociates[i].email = myAssociates[i].email === blankPlaceHolder ? '' : myAssociates[i].email
        myAssociates[i].bio = myAssociates[i].bio === blankPlaceHolder ? '' : myAssociates[i].bio
        myAssociates[i].jobTitle = myAssociates[i].jobTitle === blankPlaceHolder ? '' : myAssociates[i].jobTitle
        myAssociates[i].restaurantIdsJSON = JSON.parse(myAssociates[i].restaurantIdsJSON)
        myAssociates[i].imageUrl = myAssociates[i].imageUrl === blankPlaceHolder ? '' : myAssociates[i].imageUrl
    }
    return myAssociates;
}

// get associates from the database if they have emails, otherwise get them from restaurant associateJSON
// do this by creating an array of associateIds for records that have email, these will be on server
// those that don't have email are local to the restaurant just use that record instead
const getAssociates = async (associateIds: string | any[]) => {
    if (associateIds.length === 0) { return [] }
    let myAssociates: any[] = [];
    // get records in batches of 100 using the array of associateIds
    let myIds = [];
    let currentCount = 0;
    let lastValidNextIndex = 0;
    for (let i = 0; i < associateIds.length; i++) {
        // console.log(associateIds[i]);
        myIds.push(associateIds[i]);
        currentCount++;
        if (currentCount > 99) {
            const myBatch = await getBatch(myIds);
            myIds = [];
            currentCount = 0
            myAssociates = myAssociates.concat(myBatch)
            lastValidNextIndex = i + 1;
        }
    }

    // get any leftover records
    myIds = [];
    for (let i = lastValidNextIndex; i < associateIds.length; i++) {
        myIds.push(associateIds[i]);
    }
    const myBatch = await getBatch(myIds);
    myAssociates = myAssociates.concat(myBatch)

    return myAssociates;
}

export default getAssociates