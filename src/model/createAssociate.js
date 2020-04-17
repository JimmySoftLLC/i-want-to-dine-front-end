
import putItemDynamoDB from '../api/putItemDynamoDB';
import {
    associatesTableName,
} from '../api/apiConstants';

const createAssociate = async (myEmail, myToken, myCustomId) => {
    let myAssociate = {
        id: myEmail,
        firstName: '',
        lastName: '',
        bio: '',
        jobTitle: '',
        email: myEmail,
        restaurantIdsJSON: [],
    }
    //console.log(myAssociate)
    const data = await putItemDynamoDB(associatesTableName, myAssociate, myToken, myCustomId)
    if (data.err) {
        return null;
    }
    return myAssociate;
}

export default createAssociate;

