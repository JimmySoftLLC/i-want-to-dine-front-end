import putItemDynamoDB from '../../api/putItemDynamoDB';
import {
    restaurantsTableName,
} from '../../api/apiConstants';

const putRestaurant = async (myRestaurant: any, myToken: any, myCustomId: any) => {
    //console.log(myRestaurant, myToken, myCustomId);
    const data = await putItemDynamoDB(restaurantsTableName, myRestaurant, myToken, myCustomId)
    if (data.err) {
        return null;
    }
    return data;
}

export default putRestaurant;