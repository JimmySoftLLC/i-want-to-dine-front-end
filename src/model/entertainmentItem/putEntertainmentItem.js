import putItemDynamoDB from '../../api/putItemDynamoDB';
import {
    entertainmentItemsTableName,
} from '../../api/apiConstants';

const putEntertainmentItem = async (myEntertainmentItem, myToken, myCustomId) => {
    //console.log(myEntertainmentItem, myToken, myCustomId);
    const myNewEntertainmentItem = JSON.parse(JSON.stringify(myEntertainmentItem))
    const data = await putItemDynamoDB(entertainmentItemsTableName, myNewEntertainmentItem, myToken, myCustomId)
    if (data.err) {
        return null;
    }
    return data;
}

export default putEntertainmentItem;