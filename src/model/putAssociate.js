import putItemDynamoDB from '../api/putItemDynamoDB';
import {
    associatesTableName,
} from '../api/apiConstants';

const saveAssociate = async (myAssociate, myToken, myCustomId) => {
    //console.log(myAssociate,myToken, myCustomId);
    const data = await putItemDynamoDB(associatesTableName, myToken, myAssociate, myCustomId)
    if (data.err) {
        return null;
    }
    return data;
}

export default saveAssociate;