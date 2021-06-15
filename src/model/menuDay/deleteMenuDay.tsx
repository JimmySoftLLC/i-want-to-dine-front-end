import deleteItemDynamoDB from '../../api/deleteItemDynamoDB';
import {
    menuDaysTableName,
} from '../../api/apiConstants';

const deleteMenuDay = async (myMenuDayId: any, myToken: any, myCustomId: any) => {
    // console.log(myMenuDayId, myToken, myCustomId);
    // return null;
    const data = await deleteItemDynamoDB(menuDaysTableName, myMenuDayId, myToken, myCustomId)
    if (data.err) {
        return null;
    }
    return data;
}

export default deleteMenuDay;