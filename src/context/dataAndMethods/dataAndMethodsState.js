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
    SET_RESTAURANTS,
    SET_EDIT_MENU_ITEM,
    SET_EDIT_MENU_OPEN,
    SET_EDIT_RESTAURANTS,
    SET_EDIT_RESTAURANTS_OPEN,
    SET_SIGN_IN_REG_DIALOG_TYPE,
    SET_SIGN_IN_REG_DIALOG_TITLE,
    SET_AUTH_TOKEN,
    SET_ID_TOKEN,
    SET_CUSTOM_ID,
    SET_LOGIN_TYPE,
    SET_ASSOCIATE_RESTAURANTS,
} from '../types';

const DataAndMethodsState = props => {
    const initialState = {
        tableName: 'menuItems',
        restaurantTableName: 'restaurants',
        authToken: {},
        idToken: {},
        customId: '',
        apiName: 'i_want_to_dine_restaurant_api',
        apiPath: '/',
        logInType: 'default',
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
            restaurant: false,
        },
        editMenuOpen: false,
        signInRegDialogType: 'false',
        editRestaurantOpen: false,
        menuItems: [],
        restaurants: [],
        associateRestaurants: [],
        editMenuItemValues: {
            title: "",
            description: "",
            categoryJSON: [],
            price: 0,
            id: "",
            restaurant: "",
            dialogType: "",
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
            id: "",
            menuItemIdsJSON: [],
            associateIdsJSON: [],
            dialogType: "Edit",
            approved: false,
        },
        editAssociateValues: {
            id: "",
            canWrite: false,
            canAdmin: false,
            firstName: "",
            lastName: "",
            email: "",
            restaurantIdsJSON: [],
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

    const updateMenuIdsForRestaurant = (restaurantItem) => {
        let myMenuItemIds = [];
        for (let i = 0; i < state.menuItems.length; i++) {
            if (restaurantItem.name === state.menuItems[i].restaurant) {
                myMenuItemIds.push(state.menuItems[i].id)
            }
        }
        restaurantItem.menuItemIdsJSON = myMenuItemIds;
        updateItemDynamoDB(state.restaurantTableName, restaurantItem)
    }

    const updateAssociateIdsForRestaurant = (restaurantItem) => {
        let myAssociateIdsJSON = ['3fb19b1a-e35a-4b72-aa81-03594ab73a69'];
        restaurantItem.associateIdsJSON = myAssociateIdsJSON;
        updateItemDynamoDB(state.restaurantTableName, restaurantItem)
    }

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
                case state.tableName:
                    for (let i = 0; i < myResData.Items.length; i++) {
                        myResData.Items[i].categoryJSON = JSON.parse(myResData.Items[i].categoryJSON)
                    }
                    myResData.Items.sort(function (a, b) {
                        return a.price - b.price;
                    });
                    setMenuItems(myResData.Items)
                    break;
                case state.restaurantTableName:
                    for (let i = 0; i < myResData.Items.length; i++) {
                        myResData.Items[i].menuItemIdsJSON = JSON.parse(myResData.Items[i].menuItemIdsJSON)
                    }
                    for (let i = 0; i < myResData.Items.length; i++) {
                        myResData.Items[i].associateIdsJSON = JSON.parse(myResData.Items[i].associateIdsJSON)
                    }
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
                    //console.log(myResData.Items)
                    break;
                default:
            }
        } catch (err) {
            alertDialogContext.setDialog(true, err.message, 'Error');
            switch (TableName) {
                case state.tableName:
                    setMenuItems([])
                    break;
                case state.restaurantTableName:
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
                    menuItemIdsJSON: JSON.stringify(menuItem.menuItemIdsJSON),
                    associateIdsJSON: JSON.stringify(menuItem.associateIdsJSON),
                    approved: true,
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
            //console.log(data);
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
                    menuItemIdsJSON: JSON.stringify(menuItem.menuItemIdsJSON),
                    associateIdsJSON: JSON.stringify(menuItem.associateIdsJSON),
                    approved: true,
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
            //console.log(data);
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
            //console.log(data);
            scanDynamoDB(TableName)
        } catch (err) {
            alertDialogContext.setDialog(true, err.message, 'Error');
        }
    };

    const getItemDynamoDB = async (TableName, id) => {
        try {
            const apiRequest = {
                body: {
                    myMethod: 'get',
                    myBody: {
                        TableName: TableName,
                        Key: {
                            id: id,
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
            //console.log(data);
        } catch (err) {
            alertDialogContext.setDialog(true, err.message, 'Error');
        }
    };

    const batchGetItemDynamoDB = async (tableName, myIds, projectionExpression) => {
        let myKeys = []
        for (let i = 0; i < myIds.length; i++) {
            myKeys.push({ 'id': myIds[i] })
        }
        try {
            const apiRequest = {
                body:
                {
                    myMethod: 'batchGet',
                    myBody: {
                        RequestItems: {
                            [tableName]: {
                                myKeys,
                                Keys: myKeys,
                                ProjectionExpression: projectionExpression,
                            }
                        }
                    },
                    myId: state.customId,
                },
                headers: {
                    'Authorization': state.idToken,
                    'Content-Type': 'application/json',
                    'Accept': '*/*',
                }
            };
            //console.log('API Request:', apiRequest);
            const data = await API.post(state.apiName, state.apiPath, apiRequest);
            //console.log(data);
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
                myNewMenuItems[i].id = state.editMenuItemValues.id;
                myNewMenuItems[i].title = state.editMenuItemValues.title;
                myNewMenuItems[i].description = state.editMenuItemValues.description;
                myNewMenuItems[i].categoryJSON = state.editMenuItemValues.categoryJSON;
                myNewMenuItems[i].price = state.editMenuItemValues.price;
                myNewMenuItems[i].restaurant = state.editMenuItemValues.restaurant;
                updateItemDynamoDB(state.tableName, myNewMenuItems[i]);
                break;
            }
        }
    };

    const saveMenuItemCopy = () => {
        let myNewMenuItems = JSON.parse(JSON.stringify(state.menuItems))
        for (let i = 0; i < myNewMenuItems.length; i++) {
            if (state.editMenuItemValues.id === myNewMenuItems[i].id) {
                myNewMenuItems[i].id = uuidv4(); // create uuidv4 as the id
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

    const handleClickRestaurantEdit = (restaurantId) => {
        for (let i = 0; 1 < state.restaurants.length; i++) {
            if (restaurantId === state.restaurants[i].id) {
                let myEditItem = {
                    name: state.restaurants[i].name,
                    description: state.restaurants[i].description,
                    street: state.restaurants[i].street,
                    city: state.restaurants[i].city,
                    state: state.restaurants[i].state,
                    zipCode: state.restaurants[i].zipCode,
                    phoneNumber: state.restaurants[i].phoneNumber,
                    url: state.restaurants[i].url,
                    id: state.restaurants[i].id,
                    menuItemIdsJSON: state.restaurants[i].menuItemIdsJSON,
                    associateIdsJSON: state.restaurants[i].associateIdsJSON,
                    dialogType: "Edit",
                }
                editRestaurant(myEditItem);
                setEditRestaurantOpen(true);
                break;
            }
        }
    };

    const handleClickRestaurantCopy = (restaurantId) => {
        for (let i = 0; 1 < state.restaurants.length; i++) {
            if (restaurantId === state.restaurants[i].id) {
                let myEditItem = {
                    name: state.restaurants[i].name,
                    description: state.restaurants[i].description,
                    street: state.restaurants[i].street,
                    city: state.restaurants[i].city,
                    state: state.restaurants[i].state,
                    zipCode: state.restaurants[i].zipCode,
                    phoneNumber: state.restaurants[i].phoneNumber,
                    url: state.restaurants[i].url,
                    id: state.restaurants[i].id,
                    menuItemIdsJSON: state.restaurants[i].menuItemIdsJSON,
                    associateIdsJSON: state.restaurants[i].associateIdsJSON,
                    dialogType: "Add",
                }
                editRestaurant(myEditItem);
                setEditRestaurantOpen(true);
                break;
            }
        }
    };

    const handleClickRestaurantDelete = (restaurantId) => {
        for (let i = 0; 1 < state.restaurants.length; i++) {
            if (restaurantId === state.restaurants[i].id) {
                deleteConfirmDialogContext.setDialog(true, state.restaurants[i].name, 'Delete warning', restaurantId, deleteRestaurant);
                break;
            }
        }
    };

    const saveRestaurant = () => {
        let myNewRestaurants = JSON.parse(JSON.stringify(state.restaurants))
        for (let i = 0; i < myNewRestaurants.length; i++) {
            if (state.editRestaurantValues.id === myNewRestaurants[i].id) {
                myNewRestaurants[i].id = state.editRestaurantValues.id;
                myNewRestaurants[i].name = state.editRestaurantValues.name;
                myNewRestaurants[i].description = state.editRestaurantValues.description;
                myNewRestaurants[i].street = state.editRestaurantValues.street;
                myNewRestaurants[i].city = state.editRestaurantValues.city;
                myNewRestaurants[i].state = state.editRestaurantValues.state;
                myNewRestaurants[i].zipCode = state.editRestaurantValues.zipCode;
                myNewRestaurants[i].phoneNumber = state.editRestaurantValues.phoneNumber;
                myNewRestaurants[i].url = state.editRestaurantValues.url;
                myNewRestaurants[i].menuItemIdsJSON = state.editRestaurantValues.menuItemIdsJSON
                myNewRestaurants[i].associateIdsJSON = state.editRestaurantValues.associateIdsJSON
                myNewRestaurants[i].approved = state.editRestaurantValues.approved
                updateItemDynamoDB(state.restaurantTableName, myNewRestaurants[i]);
                //getAssociatesResturants(myNewRestaurants, state.customId)
                break;
            }
        }
    };

    const saveRestaurantCopy = () => {
        let myNewRestaurants = JSON.parse(JSON.stringify(state.restaurants))
        let myNewRestaurant = {};
        for (let i = 0; i < myNewRestaurants.length; i++) {
            if (state.editRestaurantValues.id === myNewRestaurants[i].id) {
                myNewRestaurant.id = uuidv4(); // create uuidv4 as the id
                myNewRestaurant.name = state.editRestaurantValues.name;
                myNewRestaurant.description = state.editRestaurantValues.description;
                myNewRestaurant.street = state.editRestaurantValues.street;
                myNewRestaurant.city = state.editRestaurantValues.city;
                myNewRestaurant.state = state.editRestaurantValues.state;
                myNewRestaurant.zipCode = state.editRestaurantValues.zipCode;
                myNewRestaurant.phoneNumber = state.editRestaurantValues.phoneNumber;
                myNewRestaurant.url = state.editRestaurantValues.url;
                myNewRestaurant.menuItemIdsJSON = state.editRestaurantValues.menuItemIdsJSON
                myNewRestaurant.associateIdsJSON = state.editRestaurantValues.associateIdsJSON
                myNewRestaurant.approved = state.editRestaurantValues.approved
                myNewRestaurants.push(myNewRestaurant);
                putItemDynamoDB(state.restaurantTableName, myNewRestaurant);
                //getAssociatesResturants(myNewRestaurants, state.customId)
                break;
            }
        }
    };

    const deleteRestaurant = (RestaurantId) => {
        let myNewRestaurants = JSON.parse(JSON.stringify(state.restaurants))
        for (let i = 0; 1 < myNewRestaurants.length; i++) {
            if (RestaurantId === myNewRestaurants[i].id) {
                deleteItemDynamoDB(state.restaurantTableName, myNewRestaurants[i]);
                myNewRestaurants.splice(i, 1);
                getAssociatesResturants(myNewRestaurants, state.customId);
                break;
            }
        }
    };

    const getAssociatesResturants = (myNewRestaurants, customId) => {
        let myAssociateRestaurants = [];
        for (let i = 0; i < myNewRestaurants.length; i++) {
            for (let j = 0; j < myNewRestaurants[i].associateIdsJSON.length; j++) {
                if (myNewRestaurants[i].associateIdsJSON[j] === customId) {
                    myAssociateRestaurants.push(myNewRestaurants[i]);
                }
            }
        }
        setAssociateRestaurants(myAssociateRestaurants);
    }

    // dispatch changes to the reducer ---------------------------------------------------------------------
    const setMenuItems = (menuItems) => { dispatch({ type: SET_MENU_ITEMS, payload: menuItems }) }
    const setRestaurants = (restaurants) => { dispatch({ type: SET_RESTAURANTS, payload: restaurants }) }
    const setFoodChoices = (myStates) => { dispatch({ type: SET_FOOD_CHOICES, payload: myStates }) }
    const editMenuItem = (myEditMenuItem) => { dispatch({ type: SET_EDIT_MENU_ITEM, payload: myEditMenuItem }) }
    const setEditMenuOpen = (isOpen) => { dispatch({ type: SET_EDIT_MENU_OPEN, payload: isOpen }) }
    const editRestaurant = (myRestaurant) => { dispatch({ type: SET_EDIT_RESTAURANTS, payload: myRestaurant }) }
    const setEditRestaurantOpen = (isOpen) => { dispatch({ type: SET_EDIT_RESTAURANTS_OPEN, payload: isOpen }) }
    const setSignInRegDialogType = (type) => { dispatch({ type: SET_SIGN_IN_REG_DIALOG_TYPE, payload: type }) }
    const setSignInRegDialogTitle = (title) => { dispatch({ type: SET_SIGN_IN_REG_DIALOG_TITLE, payload: title }) }
    const setAuthToken = (authToken) => { dispatch({ type: SET_AUTH_TOKEN, payload: authToken }) }
    const setIdToken = (idToken) => { dispatch({ type: SET_ID_TOKEN, payload: idToken }) }
    const setCustomId = (customId) => { dispatch({ type: SET_CUSTOM_ID, payload: customId }) }
    const setLogInType = (logInType) => { dispatch({ type: SET_LOGIN_TYPE, payload: logInType }) }
    const setAssociateRestaurants = (associateRestaurants) => { dispatch({ type: SET_ASSOCIATE_RESTAURANTS, payload: associateRestaurants }) }

    return (
        <DataAndMethodsContext.Provider
            value={{
                myStates: state.myStates,
                myMenuItemStates: state.myMenuItemStates,
                menuItems: state.menuItems,
                tableName: state.tableName,
                restaurantTableName: state.restaurantTableName,
                restaurants: state.restaurants,
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
                logInType: state.logInType,
                customId: state.customId,
                associateRestaurants: state.associateRestaurants,
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
                setLogInType,
                getAssociatesResturants,
            }}
        >
            {props.children}
        </DataAndMethodsContext.Provider>
    );
};

export default DataAndMethodsState;