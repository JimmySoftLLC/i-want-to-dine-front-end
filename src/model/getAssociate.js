import getItemDynamoDB from '../api/getItemDynamoDB';
import {
    associatesTableName,
    blankPlaceHolder,
} from '../api/apiConstants';

const getAssociate = async (myEmail, myToken, myCustomId) => {
    //console.log(myToken, myCustomId);
    const data = await getItemDynamoDB(associatesTableName, myToken, myCustomId, myEmail)
    if (data.err) {
        return null;
    }
    let myAssociate = data.payload.Item
    if (myAssociate === undefined) {
        return null;
    }
    myAssociate.firstName = myAssociate.firstName === blankPlaceHolder ? '' : myAssociate.firstName
    myAssociate.lastName = myAssociate.lastName === blankPlaceHolder ? '' : myAssociate.lastName
    myAssociate.email = myAssociate.email === blankPlaceHolder ? '' : myAssociate.email
    myAssociate.bio = myAssociate.bio === blankPlaceHolder ? '' : myAssociate.bio
    myAssociate.jobTitle = myAssociate.jobTitle === blankPlaceHolder ? '' : myAssociate.jobTitle
    myAssociate.restaurantIdsJSON = JSON.parse(myAssociate.restaurantIdsJSON)
    return myAssociate;
}

export default getAssociate