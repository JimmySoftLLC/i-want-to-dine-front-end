
import putItemDynamoDB from '../../api/putItemDynamoDB';
import {
    associatesTableName,
} from '../../api/apiConstants';

const createAssociate = async (myEmailId: any, myToken: any, myCustomId: any) => {
    let myAssociate = {
        id: myEmailId,
        firstName: '',
        lastName: '',
        bio: '',
        jobTitle: '',
        email: myEmailId,
        restaurantIdsJSON: [],
        imageUrl: '',
    }
    //console.log(myAssociate)
    const data = await putItemDynamoDB(associatesTableName, myAssociate, myToken, myCustomId)
    if (data.err) {
        return null;
    }
    return myAssociate;
}

export default createAssociate;

