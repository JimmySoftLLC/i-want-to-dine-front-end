import getItemDynamoDB from '../api/getItemDynamoDB';
import {
    associatesTableName,
} from '../api/apiConstants';

const getAssociate = async (myToken, myCustomId) => {
    //console.log(myToken, myCustomId);
    const data = await getItemDynamoDB(associatesTableName, myToken, myCustomId)
    if (data.err) {
        return {};
    }
    let associate = data.payload.Item
    associate.restaurantIdsJSON = JSON.parse(associate.restaurantIdsJSON)
    return associate;
}

export default getAssociate