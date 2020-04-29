import deleteItemDynamoDB from '../../api/deleteItemDynamoDB';
import {
    menuItemsTableName,
} from '../../api/apiConstants';

const deleteMenuItem = async (myMenuItemId, myToken, myCustomId) => {
    // console.log(myMenuItemId, myToken, myCustomId);
    // return null;
    const data = await deleteItemDynamoDB(menuItemsTableName, myMenuItemId, myToken, myCustomId)
    if (data.err) {
        return null;
    }
    return data;
}

export default deleteMenuItem;