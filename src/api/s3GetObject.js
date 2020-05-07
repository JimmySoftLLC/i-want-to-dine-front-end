import { API } from 'aws-amplify';
import {
    apiName,
    apiPath,
} from './apiConstants';

let s3GetObject = async (key, myIdToken, myCustomId) => {
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

export default s3GetObject

// import axios from 'axios';
// import {
//     lambdaFunctionURL,
// } from './apiConstants';
// let s3GetObject = async (key) => {
//     let myReturnObject = { err: false, payload: null };
//     try {
//         const res = await axios.post(
//             lambdaFunctionURL,
//             {
//                 myMethod: 's3GetObject',
//                 myBody: {
//                     Bucket: "iwanttodine",
//                     Key: "public/" + key,
//                 },
//             },
//             {
//                 headers: {
//                     Accept: '*/*',
//                     'Content-Type': 'application/json',
//                 },
//             }
//         );
//         return res.data;
//     } catch (err) {
//         return err;
//     }
// };