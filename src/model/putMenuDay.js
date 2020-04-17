import putItemDynamoDB from '../api/putItemDynamoDB';
import {
    menuDaysTableName,
} from '../api/apiConstants';

const putMenuDay = async (myMenuDay, myToken, myCustomId) => {
    const data = await putItemDynamoDB(menuDaysTableName, myMenuDay, myToken, myCustomId)
    if (data.err) {
        return null;
    }
    return data;
}

export default putMenuDay;