import { API } from 'aws-amplify';
import {
    menuItemsTableName,
    restaurantsTableName,
    associatesTableName,
    menuDaysTableName,
    apiName,
    apiPath,
    blankPlaceHolder,
} from './apiConstants';

const putItemDynamoDB = async (myTableName, myIdToken, myItem, myCustomId) => {
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
            }
            break;
        case menuDaysTableName:
            myNewItem = {
                id: myItem.id,
                title: myItem.title = myItem.title !== '' ? myItem.title : blankPlaceHolder,
                dateFrom: myItem.dateFrom,
                dateTo: myItem.dateTo,
                description: myItem.description = myItem.description !== '' ? myItem.description : blankPlaceHolder,
                menuIdsJSON: JSON.stringify(myItem.menuIdsJSON),
                associatesJSON: JSON.stringify(myItem.associatesJSON),
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