import axios from 'axios';
import sortRestaurants from "../model/restaurant/sortRestaurants";
import {
    lambdaFunctionURL,
    menuItemsTableName,
    restaurantsTableName,
    associatesTableName,
    blankPlaceHolder,
} from './apiConstants';

let scanDynamoDB = async (myTableName: any): Promise<any> => {
    let myReturnObject = { err: false, payload: null };
    try {
        const res = await axios.post(
            lambdaFunctionURL,
            {
                myMethod: 'scan',
                myBody: {
                    TableName: myTableName,
                },
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
                myResData.Items.sort(function (a: any, b: any) {
                    return a.price - b.price;
                });
                myReturnObject.payload = myResData.Items
                return myReturnObject;
            // console.log(myReturnObject)
            case restaurantsTableName:
                for (let i = 0; i < myResData.Items.length; i++) {
                    myResData.Items[i].restaurantName = myResData.Items[i].restaurantName === blankPlaceHolder ? '' : myResData.Items[i].restaurantName
                    myResData.Items[i].description = myResData.Items[i].description === blankPlaceHolder ? '' : myResData.Items[i].description
                    myResData.Items[i].street = myResData.Items[i].street === blankPlaceHolder ? '' : myResData.Items[i].street
                    myResData.Items[i].city = myResData.Items[i].city === blankPlaceHolder ? '' : myResData.Items[i].city
                    myResData.Items[i].stateUS = myResData.Items[i].stateUS === blankPlaceHolder ? '' : myResData.Items[i].stateUS
                    myResData.Items[i].zipCode = myResData.Items[i].zipCode === blankPlaceHolder ? '' : myResData.Items[i].zipCode
                    myResData.Items[i].phoneNumber = myResData.Items[i].phoneNumber === blankPlaceHolder ? '' : myResData.Items[i].phoneNumber
                    myResData.Items[i].urlLink = myResData.Items[i].urlLink === blankPlaceHolder ? '' : myResData.Items[i].urlLink
                    myResData.Items[i].orderUrlLink = myResData.Items[i].orderUrlLink === blankPlaceHolder ? '' : myResData.Items[i].orderUrlLink
                    myResData.Items[i].facebookUrlLink = myResData.Items[i].facebookUrlLink === blankPlaceHolder ? '' : myResData.Items[i].facebookUrlLink
                    myResData.Items[i].twitterUrlLink = myResData.Items[i].twitterUrlLink === blankPlaceHolder ? '' : myResData.Items[i].twitterUrlLink
                    myResData.Items[i].instagramUrlLink = myResData.Items[i].instagramUrlLink === blankPlaceHolder ? '' : myResData.Items[i].instagramUrlLink
                    myResData.Items[i].menuItemIdsJSON = JSON.parse(myResData.Items[i].menuItemIdsJSON)
                    myResData.Items[i].entertainmentItemIdsJSON = JSON.parse(myResData.Items[i].entertainmentItemIdsJSON)
                    myResData.Items[i].associatesJSON = JSON.parse(myResData.Items[i].associatesJSON)
                    myResData.Items[i].photosJSON = JSON.parse(myResData.Items[i].photosJSON)
                    if (myResData.Items[i].menuDayIdsJSON) {
                        myResData.Items[i].menuDayIdsJSON = JSON.parse(myResData.Items[i].menuDayIdsJSON)
                    } else {
                        myResData.Items[i].menuDayIdsJSON = [];
                    }
                }
                myReturnObject.payload = await sortRestaurants(myResData.Items)
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