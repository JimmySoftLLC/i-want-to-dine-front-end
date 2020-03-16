import { API } from 'aws-amplify';
import {
    apiName,
    apiPath,
} from './apiConstants';

// let myReturnObject = { err: false, payload: null };
// myReturnObject.err = true;
// myReturnObject.payload = err.message;
// return myReturnObject;

const deleteItemDynamoDB = async (myTableName, myIdToken, myId, myCustomId) => {
    let myReturnObject = { err: false, payload: null };
    try {
        const apiRequest = {
            body: {
                myMethod: 'delete',
                myBody: {
                    TableName: myTableName,
                    Key: {
                        id: myId,
                    },
                },
                myId: myCustomId,
            },
            headers: {
                'Authorization': myIdToken,
                'Content-Type': 'application/json',
                'Accept': '*/*',
            }
        };
        //console.log('API Request:', apiRequest, idToken);
        const data = await API.post(apiName, apiPath, apiRequest);
        myReturnObject.payload = data;
        return myReturnObject;
    } catch (err) {
        myReturnObject.err = true;
        myReturnObject.payload = err.message;
        return myReturnObject;
    }
};

export default deleteItemDynamoDB