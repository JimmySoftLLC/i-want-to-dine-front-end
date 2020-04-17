import deleteItemDynamoDB from '../api/deleteItemDynamoDB';
import {
    restaurantsTableName,
} from '../api/apiConstants';

const deleteRestaurant = async (myRestaurantId, myToken, myCustomId) => {
    //console.log(myRestaurantId, myToken, myCustomId);
    const data = await deleteItemDynamoDB(restaurantsTableName, myRestaurantId, myToken, myCustomId)
    if (data.err) {
        return null;
    }
    return data;
}

export default deleteRestaurant;