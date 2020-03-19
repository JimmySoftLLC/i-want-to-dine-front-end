import putItemDynamoDB from '../api/putItemDynamoDB';
import {
    tableName,
} from '../api/apiConstants';

const putMenuItem = async (myMenuItem, myToken, myCustomId) => {
    //console.log(myMenuItem, myToken, myCustomId);
    const data = await putItemDynamoDB(tableName, myToken, myMenuItem, myCustomId)
    if (data.err) {
        return null;
    }
    return data;
}

export default putMenuItem;