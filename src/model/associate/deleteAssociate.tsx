import deleteItemDynamoDB from '../../api/deleteItemDynamoDB';
import {
    associatesTableName,
} from '../../api/apiConstants';

const deleteAssociate = async (myAssociateId: any, myToken: any, myCustomId: any) => {
    // console.log(myAssociateId, myToken, myCustomId);
    // return null;
    const data = await deleteItemDynamoDB(associatesTableName, myAssociateId, myToken, myCustomId)
    if (data.err) {
        return null;
    }
    return data;
}

export default deleteAssociate;