import { API } from 'aws-amplify';
import {
    tableName,
    restaurantTableName,
    associatesTableName,
    apiName,
    apiPath,
} from './apiConstants';

// let myReturnObject = { err: false, payload: null };
// myReturnObject.err = true;
// myReturnObject.payload = err.message;

const putItemDynamoDB = async (myTableName, myIdToken, myItem, myCustomId) => {
    let myNewItem = {}
    switch (myTableName) {
        case tableName:
            myNewItem = {
                id: myItem.id,
                title: myItem.title,
                description: myItem.description,
                categoryJSON: JSON.stringify(myItem.categoryJSON),
                restaurant: myItem.restaurant,
                price: myItem.price,
            }
            break;
        case restaurantTableName:
            myNewItem = {
                id: myItem.id,
                name: myItem.name,
                description: myItem.description,
                street: myItem.street,
                city: myItem.city,
                stateUS: myItem.stateUS,
                zipCode: myItem.zipCode,
                phoneNumber: myItem.phoneNumber,
                urlLink: myItem.urlLink,
                menuItemIdsJSON: JSON.stringify(myItem.menuItemIdsJSON),
                associateIdsJSON: JSON.stringify(myItem.associateIdsJSON),
                approved: true,
            }
            break;
        case associatesTableName:
            myNewItem = {
                id: myItem.id,
                canWrite: myItem.canWrite,
                canAdmin: myItem.canAdmin,
                firstName: myItem.firstName,
                lastName: myItem.lastName,
                email: myItem.email,
                restaurantIdsJSON: JSON.stringify(myItem.restaurantIdsJSON),
            }
        default:
    }
    let myReturnObject = { err: false, payload: null };
    try {
        const apiRequest = {
            body: {
                myBody: {
                    TableName: myTableName,
                    Item: myNewItem,
                    ReturnConsumedCapacity: 'TOTAL',
                },
                myMethod: 'put',
                myId: myCustomId,
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
        //console.log(myReturnObject);
        return myReturnObject;
    } catch (err) {
        myReturnObject.err = true;
        myReturnObject.payload = err.message;
        //console.log(myReturnObject);
        return myReturnObject;
    }
};

export default putItemDynamoDB