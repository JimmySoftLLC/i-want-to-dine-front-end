import { API } from 'aws-amplify';
import {
    menuItemsTableName,
    restaurantsTableName,
    associatesTableName,
    menuDaysTableName,
    apiName,
    apiPath,
} from './apiConstants';

const putItemDynamoDB = async (myTableName, myIdToken, myItem, myCustomId) => {
    //console.log(myTableName, myIdToken, myItem, myCustomId);
    let myNewItem = {}
    switch (myTableName) {
        case menuItemsTableName:
            myNewItem = {
                id: myItem.id,
                title: myItem.title,
                description: myItem.description,
                categoryJSON: JSON.stringify(myItem.categoryJSON),
                restaurant: myItem.restaurant,
                price: myItem.price,
            }
            break;
        case restaurantsTableName:
            myNewItem = {
                id: myItem.id,
                restaurantName: myItem.restaurantName,
                description: myItem.description,
                street: myItem.street,
                city: myItem.city,
                stateUS: myItem.stateUS,
                zipCode: myItem.zipCode,
                phoneNumber: myItem.phoneNumber,
                urlLink: myItem.urlLink,
                menuItemIdsJSON: JSON.stringify(myItem.menuItemIdsJSON),
                associateIdsJSON: JSON.stringify(myItem.associateIdsJSON),
                menuDayIdsJSON: JSON.stringify(myItem.menuDayIdsJSON),
                approved: myItem.approved,
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
                bio: myItem.bio,
                jobTitle: myItem.jobTitle,
                restaurantIdsJSON: JSON.stringify(myItem.restaurantIdsJSON),
            }
            break;
        case menuDaysTableName:
            myNewItem = {
                id: myItem.id,
                title: myItem.title,
                dateFrom: myItem.dateFrom,
                dateTo: myItem.dateTo,
                description: myItem.description,
                menuIdsJSON: JSON.stringify(myItem.menuIdsJSON),
            }
            break;
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
        // console.log('API Request:', apiRequest, myIdToken);
        const data = await API.post(apiName, apiPath, apiRequest);
        myReturnObject.payload = data;
        // console.log(myReturnObject);
        return myReturnObject;
    } catch (err) {
        myReturnObject.err = true;
        myReturnObject.payload = err.message;
        //console.log(myReturnObject);
        return myReturnObject;
    }
};

export default putItemDynamoDB