import getItemDynamoDB from '../api/getItemDynamoDB';
import {
    associatesTableName,
} from '../api/apiConstants';

const getAssociate = async (myToken, myCustomId, myEmail) => {
    //console.log(myToken, myCustomId);
    const data = await getItemDynamoDB(associatesTableName, myToken, myCustomId, myEmail)
    if (data.err) {
        return null;
    }
    let associate = data.payload.Item
    if (associate === undefined) {
        return null;
    }
    associate.restaurantIdsJSON = JSON.parse(associate.restaurantIdsJSON)
    return associate;
}

export default getAssociate