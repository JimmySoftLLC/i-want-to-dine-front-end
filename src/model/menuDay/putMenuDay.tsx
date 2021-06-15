import putItemDynamoDB from '../../api/putItemDynamoDB';
import {
    menuDaysTableName,
} from '../../api/apiConstants';

const putMenuDay = async (myMenuDay: any, myToken: any, myCustomId: any) => {
    const data = await putItemDynamoDB(menuDaysTableName, myMenuDay, myToken, myCustomId)
    if (data.err) {
        return null;
    }
    return data;
}

export default putMenuDay;