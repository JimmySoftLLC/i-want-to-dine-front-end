import axios from 'axios';
import {
    lambdaFunctionURL,
    menuItemsTableName,
    restaurantsTableName,
    associatesTableName,
} from './apiConstants';

let scanDynamoDB = async myTableName => {
    let myReturnObject = { err: false, payload: null };
    try {
        const res = await axios.post(
            lambdaFunctionURL,
            {
                myBody: {
                    TableName: myTableName,
                },
                myMethod: 'scan',
            },
            {
                headers: {
                    Accept: '*/*',
                    'Content-Type': 'application/json',
                },
            }
        );
        let myResData = res.data;

        switch (myTableName) {
            case menuItemsTableName:
                for (let i = 0; i < myResData.Items.length; i++) {
                    myResData.Items[i].categoryJSON = JSON.parse(myResData.Items[i].categoryJSON)
                }
                myResData.Items.sort(function (a, b) {
                    return a.price - b.price;
                });
                myReturnObject.payload = myResData.Items
                return myReturnObject;
            // console.log(myReturnObject)
            case restaurantsTableName:
                for (let i = 0; i < myResData.Items.length; i++) {
                    myResData.Items[i].menuItemIdsJSON = JSON.parse(myResData.Items[i].menuItemIdsJSON)
                }
                for (let i = 0; i < myResData.Items.length; i++) {
                    myResData.Items[i].associateIdsJSON = JSON.parse(myResData.Items[i].associateIdsJSON)
                }
                for (let i = 0; i < myResData.Items.length; i++) {
                    if (myResData.Items[i].menuDayIdsJSON) {
                        myResData.Items[i].menuDayIdsJSON = JSON.parse(myResData.Items[i].menuDayIdsJSON)
                    } else {
                        myResData.Items[i].menuDayIdsJSON = [];
                    }
                }
                function compare(a, b) {
                    const keyA = a.restaurantName.toUpperCase();
                    const keyB = b.restaurantName.toUpperCase();
                    let comparison = 0;
                    if (keyA > keyB) {
                        comparison = 1;
                    } else if (keyA < keyB) {
                        comparison = -1;
                    }
                    return comparison;
                }
                myResData.Items.sort(compare);
                myReturnObject.payload = myResData.Items
                return myReturnObject;
            // console.log(myReturnObject)
            case associatesTableName:
                return null;
            default:
        }
    } catch (err) {
        myReturnObject.err = true;
        myReturnObject.payload = err.message;
        return myReturnObject;
    }
};

export default scanDynamoDB