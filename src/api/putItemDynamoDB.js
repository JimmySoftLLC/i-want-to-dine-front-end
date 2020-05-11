import { API } from 'aws-amplify';
import {
    menuItemsTableName,
    restaurantsTableName,
    associatesTableName,
    menuDaysTableName,
    entertainmentItemsTableName,
    apiName,
    apiPath,
    blankPlaceHolder,
} from './apiConstants';
import dateString from '../model/dateString';

const putItemDynamoDB = async (myTableName, myItem, myIdToken, myCustomId) => {
    //console.log(myTableName, myIdToken, myItem, myCustomId);
    let myNewItem = {}
    switch (myTableName) {
        case menuItemsTableName:
            myNewItem = {
                id: myItem.id,
                title: myItem.title = myItem.title !== '' ? myItem.title : blankPlaceHolder,
                description: myItem.description = myItem.description !== '' ? myItem.description : blankPlaceHolder,
                categoryJSON: JSON.stringify(myItem.categoryJSON),
                restaurant: myItem.restaurant = myItem.restaurant !== '' ? myItem.restaurant : blankPlaceHolder,
                price: myItem.price,
            }
            break;
        case restaurantsTableName:
            myNewItem = {
                id: myItem.id,
                restaurantName: myItem.restaurantName = myItem.restaurantName !== '' ? myItem.restaurantName : blankPlaceHolder,
                description: myItem.description = myItem.description !== '' ? myItem.description : blankPlaceHolder,
                street: myItem.street = myItem.street !== '' ? myItem.street : blankPlaceHolder,
                city: myItem.city = myItem.city !== '' ? myItem.city : blankPlaceHolder,
                stateUS: myItem.stateUS = myItem.stateUS !== '' ? myItem.stateUS : blankPlaceHolder,
                zipCode: myItem.zipCode = myItem.zipCode !== '' ? myItem.zipCode : blankPlaceHolder,
                phoneNumber: myItem.phoneNumber = myItem.phoneNumber !== '' ? myItem.phoneNumber : blankPlaceHolder,
                urlLink: myItem.urlLink = myItem.urlLink !== '' ? myItem.urlLink : blankPlaceHolder,
                menuItemIdsJSON: JSON.stringify(myItem.menuItemIdsJSON),
                entertainmentItemIdsJSON: JSON.stringify(myItem.entertainmentItemIdsJSON),
                associatesJSON: JSON.stringify(myItem.associatesJSON),
                menuDayIdsJSON: JSON.stringify(myItem.menuDayIdsJSON),
                approved: myItem.approved,
            }
            break;
        case associatesTableName:
            myNewItem = {
                id: myItem.id,
                firstName: myItem.firstName = myItem.firstName !== '' ? myItem.firstName : blankPlaceHolder,
                lastName: myItem.lastName = myItem.lastName !== '' ? myItem.lastName : blankPlaceHolder,
                email: myItem.email = myItem.email !== '' ? myItem.email : blankPlaceHolder,
                bio: myItem.bio = myItem.bio !== '' ? myItem.bio : blankPlaceHolder,
                jobTitle: myItem.jobTitle = myItem.jobTitle !== '' ? myItem.jobTitle : blankPlaceHolder,
                restaurantIdsJSON: JSON.stringify(myItem.restaurantIdsJSON),
                imageUrl: myItem.imageUrl !== '' ? myItem.imageUrl : blankPlaceHolder,
            }
            break;
        case menuDaysTableName:
            myNewItem = {
                id: myItem.id,
                title: myItem.title = myItem.title !== '' ? myItem.title : blankPlaceHolder,
                dateFrom: dateString(myItem.dateFrom, null, 'saveToDatabaseFromDate'),
                dateTo: dateString(myItem.dateTo, null, 'saveToDatabaseToDate'),
                description: myItem.description = myItem.description !== '' ? myItem.description : blankPlaceHolder,
                menuItemIdsJSON: JSON.stringify(myItem.menuItemIdsJSON),
                entertainmentItemIdsJSON: JSON.stringify(myItem.entertainmentItemIdsJSON),
                associatesJSON: JSON.stringify(myItem.associatesJSON),
            }
            break;
        case entertainmentItemsTableName:
            myNewItem = {
                id: myItem.id,
                title: myItem.title = myItem.title !== '' ? myItem.title : blankPlaceHolder,
                timeFrom: dateString(myItem.timeFrom, null, 'saveToDatabaseTime'),
                timeTo: dateString(myItem.timeTo, null, 'saveToDatabaseTime'),
                description: myItem.description = myItem.description !== '' ? myItem.description : blankPlaceHolder,
                imageUrl: myItem.imageUrl !== '' ? myItem.imageUrl : blankPlaceHolder,
                categoryJSON: JSON.stringify(myItem.categoryJSON),
            }
            break;
        default:
    }
    let myReturnObject = { err: false, payload: null };
    try {
        const apiRequest = {
            body: {
                myMethod: 'put',
                myBody: {
                    TableName: myTableName,
                    Item: myNewItem,
                    ReturnConsumedCapacity: 'TOTAL',
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