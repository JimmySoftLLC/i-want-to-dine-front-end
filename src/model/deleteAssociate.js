import deleteItemDynamoDB from '../api/deleteItemDynamoDB';
import {
    associatesTableName,
} from '../api/apiConstants';

const deleteAssociate = async (myAssociateId, myToken, myCustomId) => {
    // console.log(myAssociateId, myToken, myCustomId);
    // return null;
    const data = await deleteItemDynamoDB(associatesTableName, myToken, myAssociateId, myCustomId)
    if (data.err) {
        return null;
    }
    return data;
}

export default deleteAssociate;