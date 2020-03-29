import putItemDynamoDB from '../api/putItemDynamoDB';
import {
    menuDaysTableName,
} from '../api/apiConstants';

const putMenuDay = async (myMenuDay, myToken, myCustomId) => {
    //console.log(myMenuDay, myToken, myCustomId);
    const data = await putItemDynamoDB(menuDaysTableName, myToken, myMenuDay, myCustomId)
    if (data.err) {
        return null;
    }
    return data;
}

export default putMenuDay;