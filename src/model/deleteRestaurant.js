import deleteItemDynamoDB from '../api/deleteItemDynamoDB';
import {
    restaurantTableName,
} from '../api/apiConstants';

const deleteRestaurant = async (myRestaurantId, myToken, myCustomId) => {
    //console.log(myRestaurantId, myToken, myCustomId);
    const data = await deleteItemDynamoDB(restaurantTableName, myToken, myRestaurantId, myCustomId)
    if (data.err) {
        return null;
    }
    return data;
}

export default deleteRestaurant;