import putItemDynamoDB from '../api/putItemDynamoDB';
import {
    restaurantsTableName,
} from '../api/apiConstants';

const putRestaurant = async (myRestaurant, myToken, myCustomId) => {
    // console.log(myRestaurant, myToken, myCustomId);
    const data = await putItemDynamoDB(restaurantsTableName, myRestaurant, myToken, myCustomId)
    if (data.err) {
        return null;
    }
    return data;
}

export default putRestaurant;