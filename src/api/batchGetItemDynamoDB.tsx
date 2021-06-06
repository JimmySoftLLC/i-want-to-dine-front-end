import axios from 'axios';
import {
    lambdaFunctionURL,
} from './apiConstants';

const batchGetItemDynamoDB = async (myTableName: string, myIds: any, projectionExpression: any): Promise<any> => {
    // console.log(myTableName, myIds);
    let myKeys = []
    for (let i = 0; i < myIds.length; i++) {
        myKeys.push({ 'id': myIds[i] })
    }
    let myReturnObject = { err: false, payload: null };
    try {
        const res = await axios.post(
            lambdaFunctionURL,
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
            },
            {
                headers: {
                    Accept: '*/*',
                    'Content-Type': 'application/json',
                },
            }
        );
        myReturnObject.payload = res.data;
        // console.log(myReturnObject);
        return myReturnObject;
    } catch (err) {
        myReturnObject.err = true;
        myReturnObject.payload = err.message;
        return myReturnObject;
    }
};

export default batchGetItemDynamoDB