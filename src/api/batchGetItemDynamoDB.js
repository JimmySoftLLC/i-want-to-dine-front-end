import { API } from 'aws-amplify';
import {
    apiName,
    apiPath,
} from './apiConstants';

const batchGetItemDynamoDB = async (myTableName, myIdToken, myIds, myCustomId, projectionExpression) => {
    let myKeys = []
    for (let i = 0; i < myIds.length; i++) {
        myKeys.push({ 'id': myIds[i] })
    }
    let myReturnObject = { err: false, payload: null };
    try {
        const apiRequest = {
            body:
            {
                myMethod: 'batchGet',
                myBody: {
                    RequestItems: {
                        [myTableName]: {
                            Keys: myKeys,
                            ProjectionExpression: projectionExpression,
                        }
                    }
                },
                myId: myCustomId,
            },
            headers: {
                'Authorization': myIdToken,
                'Content-Type': 'application/json',
                'Accept': '*/*',
            }
        };
        //console.log('API Request:', apiRequest);
        const data = await API.post(apiName, apiPath, apiRequest);
        myReturnObject.payload = data;
        return myReturnObject;
    } catch (err) {
        myReturnObject.err = true;
        myReturnObject.payload = err.message;
        return myReturnObject;
    }
};

export default batchGetItemDynamoDB