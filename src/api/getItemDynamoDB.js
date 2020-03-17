import { API } from 'aws-amplify';
import {
    apiName,
    apiPath,
} from './apiConstants';

const getItemDynamoDB = async (myTableName, myIdToken, myId) => {
    let myReturnObject = { err: false, payload: null };
    try {
        const apiRequest = {
            body: {
                myMethod: 'get',
                myBody: {
                    TableName: myTableName,
                    Key: {
                        id: myId,
                    },
                },
                myId: myId,
            },
            headers: {
                'Authorization': myIdToken,
                'Content-Type': 'application/json',
                'Accept': '*/*',
            }
        };
        //console.log('API Request:', apiRequest, myIdToken);
        const data = await API.post(apiName, apiPath, apiRequest);
        myReturnObject.payload = data;
        return myReturnObject;
    } catch (err) {
        myReturnObject.err = true;
        myReturnObject.payload = err.message;
        return myReturnObject;
    }
};

export default getItemDynamoDB