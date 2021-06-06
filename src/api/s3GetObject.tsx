import { API } from 'aws-amplify';
import {
    apiName,
    apiPath,
} from './apiConstants';

let s3GetObject = async (key: any, myIdToken: any, myCustomId: any): Promise<any> => {
    let myReturnObject = { err: false, payload: null };
    try {
        const apiRequest = {
            body: {
                myMethod: 's3GetObject',
                myBody: {
                    Bucket: "iwanttodine",
                    Key: "public/" + key,
                },
                myId: myCustomId,
            },
            headers: {
                'Authorization': myIdToken,
                'Content-Type': 'application/json',
                'Accept': '*/*',
            }
        };
        // console.log('API Request:', apiRequest, myIdToken);
        const data = await API.post(apiName, apiPath, apiRequest);
        myReturnObject.payload = data;
        return myReturnObject;
    } catch (err) {
        myReturnObject.err = true;
        myReturnObject.payload = err.message;
        return myReturnObject;
    }
};

export default s3GetObject