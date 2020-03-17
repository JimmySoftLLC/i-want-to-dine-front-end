
import putItemDynamoDB from '../api/putItemDynamoDB';
import { v4 as uuidv4 } from 'uuid';
import {
    associatesTableName,
} from '../api/apiConstants';

const createNewAssociate = async (myToken, myCustomId, myEmail) => {
    let myAssociate = {
        id: myCustomId,
        canWrite: false,
        canAdmin: false,
        firstName: " ",
        lastName: " ",
        email: myEmail,
        restaurantIdsJSON: [],
    }
    //console.log(myAssociate)
    const data = await putItemDynamoDB(associatesTableName, myToken, myAssociate, myCustomId)
    if (data.err) {
        return null;
    }
    return myAssociate;
}

export default createNewAssociate;

