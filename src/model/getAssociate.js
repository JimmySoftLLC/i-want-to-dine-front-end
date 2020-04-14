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
    let associate = data.payload.Item
    if (associate === undefined) {
        return null;
    }
    associate.firstName = associate.firstName === blankPlaceHolder ? '' : associate.firstName
    associate.lastName = associate.lastName === blankPlaceHolder ? '' : associate.lastName
    associate.email = associate.email === blankPlaceHolder ? '' : associate.email
    associate.bio = associate.bio === blankPlaceHolder ? '' : associate.bio
    associate.jobTitle = associate.jobTitle === blankPlaceHolder ? '' : associate.jobTitle
    associate.restaurantIdsJSON = JSON.parse(associate.restaurantIdsJSON)
    return associate;
}

export default getAssociate