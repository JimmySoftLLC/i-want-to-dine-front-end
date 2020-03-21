
import putItemDynamoDB from '../api/putItemDynamoDB';
import {
    associatesTableName,
} from '../api/apiConstants';

const updateAssociateRestaurants = async (myToken, myCustomId, myAssociate, myRestaurants) => {
    let myNewAssociate = JSON.parse(JSON.stringify(myAssociate))
    let myNewRestaurantIdsJSON = [];
    for (let i = 0; i < myRestaurants.length; i++) {
        for (let j = 0; j < myRestaurants[i].associateIdsJSON.length; j++) {
            console.log(myRestaurants[i].associateIdsJSON[j] === myCustomId)
            if (myRestaurants[i].associateIdsJSON[j] === myCustomId) {
                myNewRestaurantIdsJSON.push(myRestaurants[i].id)
            }
        }
    }
    myNewAssociate.restaurantIdsJSON = myNewRestaurantIdsJSON
    console.log(myNewAssociate)
    const data = await putItemDynamoDB(associatesTableName, myToken, myNewAssociate, myCustomId)
    if (data.err) {
        return null;
    }
    return myNewAssociate;
}

export default updateAssociateRestaurants;