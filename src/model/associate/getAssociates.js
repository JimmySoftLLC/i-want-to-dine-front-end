import batchGetItemDynamoDB from '../../api/batchGetItemDynamoDB';

import {
    associatesTableName,
    projectionExpressionAssociate,
    blankPlaceHolder,
} from '../../api/apiConstants';

const getBatch = async (myIds) => {
    let myAssociates = []
    const data = await batchGetItemDynamoDB(associatesTableName, myIds, projectionExpressionAssociate)
    if (data.err) {
        return [];
    }
    myAssociates = data.payload.Responses.associates;
    myAssociates[i].firstName = myAssociates[i].firstName === blankPlaceHolder ? '' : myAssociates[i].firstName
    myAssociates[i].lastName = myAssociates[i].lastName === blankPlaceHolder ? '' : myAssociates[i].lastName
    myAssociates[i].email = myAssociates[i].email === blankPlaceHolder ? '' : myAssociates[i].email
    myAssociates[i].bio = myAssociates[i].bio === myAssociates[i] ? '' : myAssociates[i].bio
    myAssociates[i].jobTitle = myAssociates[i].jobTitle === blankPlaceHolder ? '' : myAssociates[i].jobTitle
    myAssociates[i].restaurantIdsJSON = JSON.parse(myAssociates[i].restaurantIdsJSON)
    return myAssociates;
}

const getassociates = async (associatesIds) => {
    // get records in batches of 100
    let myIds = [];
    let currentIndex = 0;
    let nextIndex = 0;
    let myAssociates = []
    for (let i = 0; i < associatesIds.length; i++) {
        myIds.push(associatesIds[i]);
        currentIndex++;
        if (currentIndex > 99) {
            const myBatch = await getBatch(myIds);
            myIds = [];
            currentIndex = 0
            myAssociates = myAssociates.concat(myBatch)
            nextIndex = i + 1;
        }
    }

    // get any leftover records
    myIds = [];
    for (let i = nextIndex; i < associatesIds.length; i++) {
        myIds.push(associatesIds[i]);
    }
    const myBatch = await getBatch(myIds);
    myAssociates = myAssociates.concat(myBatch)

    // console.log(myAssociates);
    return myAssociates;
}

export default getassociates