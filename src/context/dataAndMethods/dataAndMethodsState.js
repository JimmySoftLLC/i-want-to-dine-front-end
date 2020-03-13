import React, { useReducer, useContext } from 'react';
import axios from 'axios';
import DataAndMethodsContext from './dataAndMethodsContext';
import DataAndMethodsReducer from './dataAndMethodsReducer';
import { v4 as uuidv4 } from 'uuid';
import AlertDialogContext from '../alertDialog/alertDialogContext';
import DeleteConfirmDialogContext from '../deleteConfirmDialog/deleteConfirmDialogContext';
import { API } from 'aws-amplify';
import {
    SET_FOOD_CHOICES,
    SET_MENU_ITEMS,
    SET_RESTUARANTS,
    SET_EDIT_MENU_ITEM,
    SET_EDIT_MENU_OPEN,
    SET_EDIT_RESTUARANTS,
    SET_EDIT_RESTUARANTS_OPEN,
    SET_SIGN_IN_REG_DIALOG_TYPE,
    SET_SIGN_IN_REG_DIALOG_TITLE,
    SET_AUTH_TOKEN,
    SET_ID_TOKEN,
    SET_CUSTOM_ID,
} from '../types';

const DataAndMethodsState = props => {
    const initialState = {
        tableName: 'menuItems',
        restaurantTableName: 'resturants',
        authToken: {},
        idToken: {},
        customId: '',
        apiName: 'i_want_to_dine_restaurant_api',
        apiPath: '/',
        canEdit: false,
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
                        'Authorization': state.idToken
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
            const apiRequest = {
                body: {
                    myBody: {
                        TableName: TableName,
                        Item: myItem,
                        ReturnConsumedCapacity: 'TOTAL',
                    },
                    myMethod: 'put',
                    myId: state.customId,
                },
                headers: {
                    'Authorization': state.idToken,
                    'Content-Type': 'application/json',
                    'Accept': '*/*',
                }
            };
            //console.log('API Request:', apiRequest, state.idToken);
            const data = await API.post(state.apiName, state.apiPath, apiRequest);
            console.log(data);
            scanDynamoDB(TableName)
        } catch (err) {
            //console.log(err)
            alertDialogContext.setDialog(true, "Not authorized.", 'Error', '', 'OK', '');
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
            const apiRequest = {
                body: {
                    myBody: {
                        TableName: TableName,
                        Item: myItem,
                        ReturnConsumedCapacity: 'TOTAL',
                    },
                    myMethod: 'put',
                    myId: state.customId,
                },
                headers: {
                    'Authorization': state.idToken,
                    'Content-Type': 'application/json',
                    'Accept': '*/*',
                }
            };
            //console.log('API Request:', apiRequest, state.idToken);
            const data = await API.post(state.apiName, state.apiPath, apiRequest);
            console.log(data);
            scanDynamoDB(TableName)
        } catch (err) {
            alertDialogContext.setDialog(true, err.message, 'Error');
        }
    };

    const deleteItemDynamoDB = async (TableName, menuItem) => {
        try {
            const apiRequest = {
                body: {
                    myMethod: 'delete',
                    myBody: {
                        TableName: TableName,
                        Key: {
                            id: menuItem.id,
                        },
                    },
                    myId: state.customId,
                },
                headers: {
                    'Authorization': state.idToken,
                    'Content-Type': 'application/json',
                    'Accept': '*/*',
                }
            };
            //console.log('API Request:', apiRequest, state.idToken);
            const data = await API.post(state.apiName, state.apiPath, apiRequest);
            console.log(data);
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
    const setAuthToken = (authToken) => { dispatch({ type: SET_AUTH_TOKEN, payload: authToken }) }
    const setIdToken = (idToken) => { dispatch({ type: SET_ID_TOKEN, payload: idToken }) }
    const setCustomId = (customId) => { dispatch({ type: SET_CUSTOM_ID, payload: customId }) }

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
                authToken: state.authToken,
                idToken: state.idToken,
                apiPath: state.apiPath,
                apiName: state.apiName,
                canEdit: state.canEdit,
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
                setSignInRegDialogTitle,
                setAuthToken,
                setIdToken,
                setCustomId,
            }}
        >
            {props.children}
        </DataAndMethodsContext.Provider>
    );
};

export default DataAndMethodsState;