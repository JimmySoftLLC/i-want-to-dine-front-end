import deleteItemDynamoDB from '../../api/deleteItemDynamoDB';
import {
    entertainmentItemsTableName,
} from '../../api/apiConstants';

const deleteEntertainmentItem = async (myEntertainmentItemId, myToken, myCustomId) => {
    // console.log(myEntertainmentItemId, myToken, myCustomId);
    // return null;
    const data = await deleteItemDynamoDB(entertainmentItemsTableName, myEntertainmentItemId, myToken, myCustomId)
    if (data.err) {
        return null;
    }
    return data;
}

export default deleteEntertainmentItem;