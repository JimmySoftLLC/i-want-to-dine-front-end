import deleteItemDynamoDB from '../api/deleteItemDynamoDB';
import {
    menuDaysTableName,
} from '../api/apiConstants';

const deleteMenuDay = async (myMenuDayId, myToken, myCustomId) => {
    // console.log(myMenuDayId, myToken, myCustomId);
    // return null;
    const data = await deleteItemDynamoDB(menuDaysTableName, myToken, myMenuDayId, myCustomId)
    if (data.err) {
        return null;
    }
    return data;
}

export default deleteMenuDay;