import React, { useReducer, useContext } from 'react';
import axios from 'axios';
import DataAndMethodsContext from './dataAndMethodsContext';
import DataAndMethodsReducer from './dataAndMethodsReducer';
import { v4 as uuidv4 } from 'uuid';
import AlertDialogContext from '../alertDialog/alertDialogContext';
import DeleteConfirmDialogContext from '../deleteConfirmDialog/deleteConfirmDialogContext';
import {
    SET_FOOD_CHOICES,
    SET_MENU_ITEMS,
    SET_RESTUARANTS,
    SET_EDIT_MENU_ITEM,
    SET_EDIT_MENU_OPEN,
    SET_EDIT_RESTUARANTS,
    SET_EDIT_RESTUARANTS_OPEN,
    SET_SIGN_IN_REG_DIALOG_TYPE,
    SET_SIGN_IN_REG_DIALOG_TITLE
} from '../types';
let auth = require('../../auth/auth');

const DataAndMethodsState = props => {
    const initialState = {
        tableName: 'menuItems',
        restaurantTableName: 'resturants',
        myStates: {
            meat: true,
            ham: false,
            lamb: false,
            poultry: false,
            fish: false,
            shellfish: false,
            vegetarian: false,
            cheese: false,
            pasta: false,
            sandwich: false,
            dessert: false,
            special: false,
            info: false,
            dollar_1: false,
            dollar_2: true,
            dollar_3: false,
            restuarant: false,
        },
        editMenuOpen: false,
        signInRegDialogType: 'false',
        editRestaurantOpen: false,
        menuItems: [],
        Restaurants: [],
        editMenuItemValues: {
            title: "",
            name: "",
            description: "",
            street: "",
            city: "",
            state: "",
            zipCode: "",
            phoneNumber: "",
            url: "",
            category: [],
            price: 0,
            dialogType: "",
            id: "",
            Restaurant: "",
        },
        editRestaurantValues: {
            name: "",
            description: "",
            street: "",
            city: "",
            state: "",
            zipCode: "",
            phoneNumber: "",
            url: "",
            dialogType: "",
            id: "",
        }
    };

    const [state, dispatch] = useReducer(DataAndMethodsReducer, initialState);
    const alertDialogContext = useContext(AlertDialogContext);
    const deleteConfirmDialogContext = useContext(DeleteConfirmDialogContext);


    const lambdaFunctionURL = 'https://kd7snpev85.execute-api.us-east-1.amazonaws.com/default/i_want_to_dine_api';
    // const lambdaFunctionURL = 'https://544oilp830.execute-api.us-east-1.amazonaws.com/default/cognitoTest';



    //set food choices
    const setFoodChoice = async key => {
        let myNewFoodChoices = JSON.parse(JSON.stringify(state.myStates))
        myNewFoodChoices[key] ? myNewFoodChoices[key] = false : myNewFoodChoices[key] = true;
        setFoodChoices(myNewFoodChoices);
    };

    // api calls ----------------------------------------------------------------

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
                        'Content-Type': 'application/json',
                        'Authorization': 'eyJraWQiOiJVXC81ZWtVREhHNVJ4czUzOU95N3FwdjlBeWhKVStOaFpxdk9qdkVvWkdyWT0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI1ZjdlZjQwZS0yZjkzLTQ1YzUtYmFhMy1mMmVhM2QyMzUwODgiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLWVhc3QtMS5hbWF6b25hd3MuY29tXC91cy1lYXN0LTFfNGFqVTllMVluIiwicGhvbmVfbnVtYmVyX3ZlcmlmaWVkIjpmYWxzZSwiY29nbml0bzp1c2VybmFtZSI6IjVmN2VmNDBlLTJmOTMtNDVjNS1iYWEzLWYyZWEzZDIzNTA4OCIsImF1ZCI6IjJlNzBiY29ubXBldHNmZjg2dmFrYnFpa24xIiwiZXZlbnRfaWQiOiIzYWQwNzQyNi01ZDQyLTRjMDktYmE5Ni03YTk1MDI0ZGFkMDIiLCJ0b2tlbl91c2UiOiJpZCIsImF1dGhfdGltZSI6MTU4Mzg2ODI1MSwicGhvbmVfbnVtYmVyIjoiKzE3MDM1NTUxMjEyIiwiZXhwIjoxNTgzODcxODUxLCJpYXQiOjE1ODM4NjgyNTEsImVtYWlsIjoiamJhaWxleUBqaW1teXNvZnRsbGMuY29tIn0.NrHqqejSt3BLIngo1AdHLt_49idwup_q0M40pPDVxoVOAupX5XNtNaQPj0KiKVgH3oZeTYW3ULYkY0UKzIiGLT8A9XItYPdXhb3rFXAq6LvCbobb9Ach3oyXLcYDyP3281QOt4FF0aFbpy6WYrB_3qC049I3WF5Ec0_EYd-kP2TUsC2Bq_vgtRysj3o40CDNNWOod_meKnz5lTiNJVEz-oDIW5lKT2eOWKO-peahZjezIWLR4bdj1woprvU9IB3ZLtOgWxHSl_qkAcTekx9pXqBdOFu-G3ksrT4dxqbl6_k-_ua--IRjuzIzNejkn7XQpnRT6q6yohgGV1Ax_pGluQ'
                    },
                }
            );
            let myResData = res.data;
            switch (TableName) {
                case 'menuItems':
                    for (let i = 0; i < myResData.Items.length; i++) {
                        myResData.Items[i].categoryJSON = JSON.parse(myResData.Items[i].categoryJSON)
                    }
                    myResData.Items.sort(function (a, b) {
                        return a.price - b.price;
                    });
                    setMenuItems(myResData.Items)
                    break;
                case 'resturants':
                    function compare(a, b) {
                        const keyA = a.name.toUpperCase();
                        const keyB = b.name.toUpperCase();
                        let comparison = 0;
                        if (keyA > keyB) {
                            comparison = 1;
                        } else if (keyA < keyB) {
                            comparison = -1;
                        }
                        return comparison;
                    }
                    myResData.Items.sort(compare);
                    setRestaurants(myResData.Items)
                    break;
                default:
            }
        } catch (err) {
            alertDialogContext.setDialog(true, err.message, 'Error');
            switch (TableName) {
                case 'menuItems':
                    setMenuItems([])
                    break;
                case 'Restaurants':
                    setRestaurants([])
                    break;
                default:
            }
        }
    };

    const updateItemDynamoDB = async (TableName, menuItem) => {
        let myItem = {}
        switch (TableName) {
            case state.tableName:
                myItem = {
                    id: menuItem.id,
                    title: menuItem.title,
                    description: menuItem.description,
                    categoryJSON: JSON.stringify(menuItem.categoryJSON),
                    restaurant: menuItem.restaurant,
                    price: menuItem.price,
                }
                break;
            case state.restaurantTableName:
                myItem = {
                    id: menuItem.id,
                    name: menuItem.name,
                    description: menuItem.description,
                    street: menuItem.street,
                    city: menuItem.city,
                    state: menuItem.state,
                    zipCode: menuItem.zipCode,
                    phoneNumber: menuItem.phoneNumber,
                    url: menuItem.url,
                }
                break;
            default:
        }
        try {
            const res = await axios.post(
                lambdaFunctionURL,
                {
                    myBody: {
                        TableName: TableName,
                        Item: myItem,
                        ReturnConsumedCapacity: 'TOTAL',
                    },
                    myMethod: 'put',
                },
                {
                    headers: {
                        Accept: '*/*',
                    },
                }
            );
            scanDynamoDB(TableName)
        } catch (err) {
            alertDialogContext.setDialog(true, err.message, 'Error', '', 'OK', '');
        }
    };

    const putItemDynamoDB = async (TableName, menuItem) => {
        let myItem = {}
        switch (TableName) {
            case state.tableName:
                myItem = {
                    id: uuidv4(), // create uuidv4 as the id
                    title: menuItem.title,
                    description: menuItem.description,
                    categoryJSON: JSON.stringify(menuItem.categoryJSON),
                    restaurant: menuItem.restaurant,
                    price: menuItem.price,
                }
                break;
            case state.restaurantTableName:
                myItem = {
                    id: uuidv4(), // create uuidv4 as the id
                    name: menuItem.name,
                    description: menuItem.description,
                    street: menuItem.street,
                    city: menuItem.city,
                    state: menuItem.state,
                    zipCode: menuItem.zipCode,
                    phoneNumber: menuItem.phoneNumber,
                    url: menuItem.url,
                }
                break;
            default:
        }
        try {
            const res = await axios.post(
                lambdaFunctionURL,
                {
                    myBody: {
                        TableName: TableName,
                        Item: myItem,
                        ReturnConsumedCapacity: 'TOTAL',
                    },
                    myMethod: 'put',
                },
                {
                    headers: {
                        Accept: '*/*',
                    },
                }
            );
            scanDynamoDB(TableName)
        } catch (err) {
            alertDialogContext.setDialog(true, err.message, 'Error');
        }
    };

    const deleteItemDynamoDB = async (TableName, menuItem) => {
        try {
            const res = await axios.post(
                lambdaFunctionURL,
                {
                    myMethod: 'delete',
                    myBody: {
                        TableName: TableName,
                        Key: {
                            id: menuItem.id,
                        },
                    },
                },
                {
                    headers: {
                        Accept: '*/*',
                    },
                },
            );
            scanDynamoDB(TableName)
        } catch (err) {
            alertDialogContext.setDialog(true, err.message, 'Error');
        }
    };

    const getItemDynamoDB = async (TableName, id) => {
        try {
            const res = await axios.post(
                lambdaFunctionURL,
                {
                    myMethod: 'get',
                    myBody: {
                        TableName: TableName,
                        Key: {
                            id: id,
                        },
                    },
                },
                {
                    headers: {
                        Accept: '*/*',
                    },
                },
            );
            console.log(res.data);
        } catch (err) {
            alertDialogContext.setDialog(true, err.message, 'Error');
        }
    };

    // menu item calls ----------------------------------------------------------------

    const setEditMenuItem = async (key, value) => {
        let myEditMenuItem = JSON.parse(JSON.stringify(state.editMenuItemValues))
        myEditMenuItem[key] = value;
        editMenuItem(myEditMenuItem);
    }

    const setEditMenuItemCategory = async (key) => {
        let myNewCategories = JSON.parse(JSON.stringify(state.editMenuItemValues.categoryJSON))
        let myIndex = myNewCategories.indexOf(key, 0)
        if (myIndex !== -1) {
            myNewCategories.splice(myIndex, 1)
        } else {
            myNewCategories.push(key)
        }
        setEditMenuItem('categoryJSON', myNewCategories)
    }

    const handleClickMenuItemEdit = (menuId) => {
        for (let i = 0; 1 < state.menuItems.length; i++) {
            if (menuId === state.menuItems[i].id) {
                let myEditItem = {
                    title: state.menuItems[i].title,
                    description: state.menuItems[i].description,
                    categoryJSON: state.menuItems[i].categoryJSON,
                    price: state.menuItems[i].price,
                    id: state.menuItems[i].id,
                    restaurant: state.menuItems[i].restaurant,
                    dialogType: "Edit",
                }
                editMenuItem(myEditItem);
                setEditMenuOpen(true);
                break;
            }
        }
    };

    const handleClickMenuItemCopy = (menuId) => {
        for (let i = 0; 1 < state.menuItems.length; i++) {
            if (menuId === state.menuItems[i].id) {
                let myEditItem = {
                    title: state.menuItems[i].title,
                    description: state.menuItems[i].description,
                    categoryJSON: state.menuItems[i].categoryJSON,
                    price: state.menuItems[i].price,
                    id: state.menuItems[i].id,
                    restaurant: state.menuItems[i].restaurant,
                    dialogType: "Add",
                }
                editMenuItem(myEditItem);
                setEditMenuOpen(true);
                break;
            }
        }
    };

    const handleClickMenuItemDelete = (menuId) => {
        for (let i = 0; 1 < state.menuItems.length; i++) {
            if (menuId === state.menuItems[i].id) {
                deleteConfirmDialogContext.setDialog(true, state.menuItems[i].title, 'Delete warning', menuId, deleteMenuItem);
                break;
            }
        }
    };

    const deleteMenuItem = (RestaurantId) => {
        for (let i = 0; 1 < state.menuItems.length; i++) {
            if (RestaurantId === state.menuItems[i].id) {
                deleteItemDynamoDB(state.tableName, state.menuItems[i]);
                break;
            }
        }
    };

    const saveMenuItem = () => {
        let myNewMenuItems = JSON.parse(JSON.stringify(state.menuItems))
        for (let i = 0; i < myNewMenuItems.length; i++) {
            if (state.editMenuItemValues.id === myNewMenuItems[i].id) {
                myNewMenuItems[i].title = state.editMenuItemValues.title;
                myNewMenuItems[i].description = state.editMenuItemValues.description;
                myNewMenuItems[i].categoryJSON = state.editMenuItemValues.categoryJSON;
                myNewMenuItems[i].price = state.editMenuItemValues.price;
                myNewMenuItems[i].restaurant = state.editMenuItemValues.restaurant;
                updateItemDynamoDB(state.tableName, myNewMenuItems[i]);
                //getItemDynamoDB(state.tableName, myNewMenuItems[i].id);
                break;
            }
        }
    };

    const saveMenuItemCopy = () => {
        let myNewMenuItems = JSON.parse(JSON.stringify(state.menuItems))
        for (let i = 0; i < myNewMenuItems.length; i++) {
            if (state.editMenuItemValues.id === myNewMenuItems[i].id) {
                myNewMenuItems[i].title = state.editMenuItemValues.title;
                myNewMenuItems[i].description = state.editMenuItemValues.description;
                myNewMenuItems[i].categoryJSON = state.editMenuItemValues.categoryJSON;
                myNewMenuItems[i].price = state.editMenuItemValues.price;
                myNewMenuItems[i].restaurant = state.editMenuItemValues.restaurant;
                putItemDynamoDB(state.tableName, myNewMenuItems[i]);
                break;
            }
        }
    };

    // Restaurant calls ----------------------------------------------------------------------

    const setRestaurantItem = async (key, value) => {
        let myEditRestaurant = JSON.parse(JSON.stringify(state.editRestaurantValues))
        myEditRestaurant[key] = value;
        editRestaurant(myEditRestaurant);
    }

    const handleClickRestaurantEdit = (RestaurantId) => {
        for (let i = 0; 1 < state.Restaurants.length; i++) {
            if (RestaurantId === state.Restaurants[i].id) {
                let myEditItem = {
                    name: state.Restaurants[i].name,
                    description: state.Restaurants[i].description,
                    street: state.Restaurants[i].street,
                    city: state.Restaurants[i].city,
                    state: state.Restaurants[i].state,
                    zipCode: state.Restaurants[i].zipCode,
                    phoneNumber: state.Restaurants[i].phoneNumber,
                    url: state.Restaurants[i].url,
                    id: state.Restaurants[i].id,
                    dialogType: "Edit",
                }
                editRestaurant(myEditItem);
                setEditRestaurantOpen(true);
                break;
            }
        }
    };

    const handleClickRestaurantCopy = (RestaurantId) => {
        for (let i = 0; 1 < state.Restaurants.length; i++) {
            if (RestaurantId === state.Restaurants[i].id) {
                let myEditItem = {
                    name: state.Restaurants[i].name,
                    description: state.Restaurants[i].description,
                    street: state.Restaurants[i].street,
                    city: state.Restaurants[i].city,
                    state: state.Restaurants[i].state,
                    zipCode: state.Restaurants[i].zipCode,
                    phoneNumber: state.Restaurants[i].phoneNumber,
                    url: state.Restaurants[i].url,
                    id: state.Restaurants[i].id,
                    dialogType: "Add",
                }
                editRestaurant(myEditItem);
                setEditRestaurantOpen(true);
                break;
            }
        }
    };

    const handleClickRestaurantDelete = (RestaurantId) => {
        for (let i = 0; 1 < state.Restaurants.length; i++) {
            if (RestaurantId === state.Restaurants[i].id) {
                deleteConfirmDialogContext.setDialog(true, state.Restaurants[i].name, 'Delete warning', RestaurantId, deleteRestaurant);
                break;
            }
        }
    };

    const deleteRestaurant = (RestaurantId) => {
        for (let i = 0; 1 < state.Restaurants.length; i++) {
            if (RestaurantId === state.Restaurants[i].id) {
                deleteItemDynamoDB(state.restaurantTableName, state.Restaurants[i]);
                break;
            }
        }
    };

    const saveRestaurant = () => {
        let myNewRestaurants = JSON.parse(JSON.stringify(state.Restaurants))
        for (let i = 0; i < myNewRestaurants.length; i++) {
            if (state.editRestaurantValues.id === myNewRestaurants[i].id) {
                myNewRestaurants[i].name = state.editRestaurantValues.name;
                myNewRestaurants[i].description = state.editRestaurantValues.description;
                myNewRestaurants[i].street = state.editRestaurantValues.street;
                myNewRestaurants[i].city = state.editRestaurantValues.city;
                myNewRestaurants[i].state = state.editRestaurantValues.state;
                myNewRestaurants[i].zipCode = state.editRestaurantValues.zipCode;
                myNewRestaurants[i].phoneNumber = state.editRestaurantValues.phoneNumber;
                myNewRestaurants[i].url = state.editRestaurantValues.url;
                updateItemDynamoDB(state.restaurantTableName, myNewRestaurants[i]);
                break;
            }
        }
    };

    const saveRestaurantCopy = () => {
        let myNewRestaurants = JSON.parse(JSON.stringify(state.Restaurants))
        for (let i = 0; i < myNewRestaurants.length; i++) {
            if (state.editRestaurantValues.id === myNewRestaurants[i].id) {
                myNewRestaurants[i].name = state.editRestaurantValues.name;
                myNewRestaurants[i].description = state.editRestaurantValues.description;
                myNewRestaurants[i].street = state.editRestaurantValues.street;
                myNewRestaurants[i].city = state.editRestaurantValues.city;
                myNewRestaurants[i].state = state.editRestaurantValues.state;
                myNewRestaurants[i].zipCode = state.editRestaurantValues.zipCode;
                myNewRestaurants[i].phoneNumber = state.editRestaurantValues.phoneNumber;
                myNewRestaurants[i].url = state.editRestaurantValues.url;
                putItemDynamoDB(state.restaurantTableName, myNewRestaurants[i]);
                break;
            }
        }
    };

    // dispatch changes to the reducer ---------------------------------------------------------------------
    const setMenuItems = (menuItems) => { dispatch({ type: SET_MENU_ITEMS, payload: menuItems }) }
    const setRestaurants = (Restaurants) => { dispatch({ type: SET_RESTUARANTS, payload: Restaurants }) }
    const setFoodChoices = (myStates) => { dispatch({ type: SET_FOOD_CHOICES, payload: myStates }) }
    const editMenuItem = (myEditMenuItem) => { dispatch({ type: SET_EDIT_MENU_ITEM, payload: myEditMenuItem }) }
    const setEditMenuOpen = (isOpen) => { dispatch({ type: SET_EDIT_MENU_OPEN, payload: isOpen }) }
    const editRestaurant = (myRestaurant) => { dispatch({ type: SET_EDIT_RESTUARANTS, payload: myRestaurant }) }
    const setEditRestaurantOpen = (isOpen) => { dispatch({ type: SET_EDIT_RESTUARANTS_OPEN, payload: isOpen }) }
    const setSignInRegDialogType = (type) => { dispatch({ type: SET_SIGN_IN_REG_DIALOG_TYPE, payload: type }) }
    const setSignInRegDialogTitle = (title) => { dispatch({ type: SET_SIGN_IN_REG_DIALOG_TITLE, payload: title }) }

    return (
        <DataAndMethodsContext.Provider
            value={{
                myStates: state.myStates,
                myMenuItemStates: state.myMenuItemStates,
                menuItems: state.menuItems,
                tableName: state.tableName,
                restaurantTableName: state.restaurantTableName,
                Restaurants: state.Restaurants,
                editMenuItemValues: state.editMenuItemValues,
                editRestaurantValues: state.editRestaurantValues,
                editMenuOpen: state.editMenuOpen,
                editRestaurantOpen: state.editRestaurantOpen,
                signInRegDialogType: state.signInRegDialogType,
                signInRegDialogTitle: state.signInRegDialogTitle,
                setFoodChoice,
                setFoodChoices,
                scanDynamoDB,
                setRestaurants,
                setEditMenuItem,
                setEditMenuItemCategory,
                setEditMenuOpen,
                setEditRestaurantOpen,
                handleClickMenuItemEdit,
                saveMenuItem,
                updateItemDynamoDB,
                putItemDynamoDB,
                handleClickMenuItemCopy,
                saveMenuItemCopy,
                handleClickMenuItemDelete,
                handleClickRestaurantEdit,
                handleClickRestaurantCopy,
                handleClickRestaurantDelete,
                saveRestaurant,
                saveRestaurantCopy,
                setRestaurantItem,
                setSignInRegDialogType,
                setSignInRegDialogTitle
            }}
        >
            {props.children}
        </DataAndMethodsContext.Provider>
    );
};

export default DataAndMethodsState;