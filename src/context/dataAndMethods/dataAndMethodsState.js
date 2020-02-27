import React, { useReducer, useContext } from 'react';
import axios from 'axios';
import DataAndMethodsContext from './dataAndMethodsContext';
import DataAndMethodsReducer from './dataAndMethodsReducer';
import AlertDialogContext from '../alertDialog/alertDialogContext';
import {
    SET_FOOD_CHOICES,
    SET_MENU_ITEMS,
    SET_MENU_IDS,
} from '../types';

const DataAndMethodsState = props => {
    const initialState = {
        tableName: 'menuItems',
        myStates: {
            meat: false,
            poultry: false,
            pasta: false,
            sandwich: false,
            shellfish: false,
            vegetarian: false,
            dessert: false,
            info: false,
            dollar_1: false,
            dollar_2: false,
            dollar_3: false,
        },
        menuIds: [],
        menuItems: []
    };

    const [state, dispatch] = useReducer(DataAndMethodsReducer, initialState);
    const alertDialogContext = useContext(AlertDialogContext);
    const lambdaFunctionURL =
        'https://yfyft0meu9.execute-api.us-east-1.amazonaws.com/default/restapi';

    //set food choices
    const setFoodChoice = async key => {
        let myNewFoodChoices = JSON.parse(JSON.stringify(state.myStates))
        let myNewMenuItems = JSON.parse(JSON.stringify(state.menuItems))
        myNewMenuItems.sort(function (a, b) {
            return a.price - b.price;
        });
        myNewFoodChoices[key] ? myNewFoodChoices[key] = false : myNewFoodChoices[key] = true;
        setMenuItems(myNewMenuItems);
        setFoodChoices(myNewFoodChoices);
    };

    const scanDynamoDB = async TableName => {
        try {
            const res = await axios.post(
                lambdaFunctionURL,
                {
                    myBody: {
                        TableName: TableName,
                    },
                    myMethod: 'scan',
                },
                {
                    headers: {
                        Accept: '*/*',
                    },
                }
            );
            let myResData = res.data;
            //console.log(myResData);
            setMenuItems(myResData.Items)
            //return myResData.Items;
        } catch (err) {
            console.log(err);
            //alertDialogContext.setAlertDialog(true, err.message, 'Error');
            setMenuItems([]);
        }
    };

    const setMenuIds = (menuIds) => { dispatch({ type: SET_MENU_IDS, payload: menuIds }) }
    const setMenuItems = (menuItems) => { dispatch({ type: SET_MENU_ITEMS, payload: menuItems }) }
    const setFoodChoices = (myStates) => { dispatch({ type: SET_FOOD_CHOICES, payload: myStates }) }

    return (
        <DataAndMethodsContext.Provider
            value={{
                myStates: state.myStates,
                menuItems: state.menuItems,
                tableName: state.tableName,
                setFoodChoice,
                setFoodChoices,
                scanDynamoDB,
                setMenuIds,
            }}
        >
            {props.children}
        </DataAndMethodsContext.Provider>
    );
};



export default DataAndMethodsState;