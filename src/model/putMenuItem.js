import putItemDynamoDB from '../api/putItemDynamoDB';
import {
    menuItemsTableName,
} from '../api/apiConstants';

const putMenuItem = async (myMenuItem, myToken, myCustomId) => {
    //console.log(myMenuItem, myToken, myCustomId);
    const data = await putItemDynamoDB(menuItemsTableName, myToken, myMenuItem, myCustomId)
    if (data.err) {
        return null;
    }
    return data;
}

export default putMenuItem;