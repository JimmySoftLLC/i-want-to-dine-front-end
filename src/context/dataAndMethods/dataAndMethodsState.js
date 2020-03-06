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
    SET_resturants,
    SET_EDIT_MENU_ITEM,
    SET_EDIT_MENU_OPEN,
    SET_EDIT_RESTURANT,
    SET_EDIT_RESTURANT_OPEN
} from '../types';

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
        editResturantOpen: false,
        menuItems: [],
        resturants: [],
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
        },
        editResturantValues: {
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
                    setresturants(myResData.Items)
                    break;
                default:
            }
        } catch (err) {
            alertDialogContext.setDialog(true, err.message, 'Error');
            switch (TableName) {
                case 'menuItems':
                    setMenuItems([])
                    break;
                case 'resturants':
                    setresturants([])
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

    const deleteMenuItem = (resturantId) => {
        for (let i = 0; 1 < state.menuItems.length; i++) {
            if (resturantId === state.menuItems[i].id) {
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
                putItemDynamoDB(state.tableName, myNewMenuItems[i]);
                break;
            }
        }
    };

    // resturant calls ----------------------------------------------------------------------

    const setResturantItem = async (key, value) => {
        let myEditResturant = JSON.parse(JSON.stringify(state.editResturantValues))
        myEditResturant[key] = value;
        editResturant(myEditResturant);
    }

    const handleClickResturantEdit = (resturantId) => {
        for (let i = 0; 1 < state.resturants.length; i++) {
            if (resturantId === state.resturants[i].id) {
                let myEditItem = {
                    name: state.resturants[i].name,
                    description: state.resturants[i].description,
                    street: state.resturants[i].street,
                    city: state.resturants[i].city,
                    state: state.resturants[i].state,
                    zipCode: state.resturants[i].zipCode,
                    phoneNumber: state.resturants[i].phoneNumber,
                    url: state.resturants[i].url,
                    id: state.resturants[i].id,
                    dialogType: "Edit",
                }
                editResturant(myEditItem);
                setEditResturantOpen(true);
                break;
            }
        }
    };

    const handleClickResturantCopy = (resturantId) => {
        for (let i = 0; 1 < state.resturants.length; i++) {
            if (resturantId === state.resturants[i].id) {
                let myEditItem = {
                    name: state.resturants[i].name,
                    description: state.resturants[i].description,
                    street: state.resturants[i].street,
                    city: state.resturants[i].city,
                    state: state.resturants[i].state,
                    zipCode: state.resturants[i].zipCode,
                    phoneNumber: state.resturants[i].phoneNumber,
                    url: state.resturants[i].url,
                    id: state.resturants[i].id,
                    dialogType: "Add",
                }
                editResturant(myEditItem);
                setEditResturantOpen(true);
                break;
            }
        }
    };

    const handleClickResturantDelete = (resturantId) => {
        for (let i = 0; 1 < state.resturants.length; i++) {
            if (resturantId === state.resturants[i].id) {
                deleteConfirmDialogContext.setDialog(true, state.resturants[i].name, 'Delete warning', resturantId, deleteResturant);
                break;
            }
        }
    };

    const deleteResturant = (resturantId) => {
        for (let i = 0; 1 < state.resturants.length; i++) {
            if (resturantId === state.resturants[i].id) {
                deleteItemDynamoDB(state.restaurantTableName, state.resturants[i]);
                break;
            }
        }
    };

    const saveResturant = () => {
        let myNewResturants = JSON.parse(JSON.stringify(state.resturants))
        for (let i = 0; i < myNewResturants.length; i++) {
            if (state.editResturantValues.id === myNewResturants[i].id) {
                myNewResturants[i].name = state.editResturantValues.name;
                myNewResturants[i].description = state.editResturantValues.description;
                myNewResturants[i].street = state.editResturantValues.street;
                myNewResturants[i].city = state.editResturantValues.city;
                myNewResturants[i].state = state.editResturantValues.state;
                myNewResturants[i].zipCode = state.editResturantValues.zipCode;
                myNewResturants[i].phoneNumber = state.editResturantValues.phoneNumber;
                myNewResturants[i].url = state.editResturantValues.url;
                updateItemDynamoDB(state.restaurantTableName, myNewResturants[i]);
                break;
            }
        }
    };

    const saveResturantCopy = () => {
        let myNewResturants = JSON.parse(JSON.stringify(state.resturants))
        for (let i = 0; i < myNewResturants.length; i++) {
            if (state.editResturantValues.id === myNewResturants[i].id) {
                myNewResturants[i].name = state.editResturantValues.name;
                myNewResturants[i].description = state.editResturantValues.description;
                myNewResturants[i].street = state.editResturantValues.street;
                myNewResturants[i].city = state.editResturantValues.city;
                myNewResturants[i].state = state.editResturantValues.state;
                myNewResturants[i].zipCode = state.editResturantValues.zipCode;
                myNewResturants[i].phoneNumber = state.editResturantValues.phoneNumber;
                myNewResturants[i].url = state.editResturantValues.url;
                putItemDynamoDB(state.restaurantTableName, myNewResturants[i]);
                break;
            }
        }
    };

    // dispatch changes to the reducer ---------------------------------------------------------------------
    const setMenuItems = (menuItems) => { dispatch({ type: SET_MENU_ITEMS, payload: menuItems }) }
    const setresturants = (resturants) => { dispatch({ type: SET_resturants, payload: resturants }) }
    const setFoodChoices = (myStates) => { dispatch({ type: SET_FOOD_CHOICES, payload: myStates }) }
    const editMenuItem = (myEditMenuItem) => { dispatch({ type: SET_EDIT_MENU_ITEM, payload: myEditMenuItem }) }
    const setEditMenuOpen = (isOpen) => { dispatch({ type: SET_EDIT_MENU_OPEN, payload: isOpen }) }
    const editResturant = (myResturant) => { dispatch({ type: SET_EDIT_RESTURANT, payload: myResturant }) }
    const setEditResturantOpen = (isOpen) => { dispatch({ type: SET_EDIT_RESTURANT_OPEN, payload: isOpen }) }

    return (
        <DataAndMethodsContext.Provider
            value={{
                myStates: state.myStates,
                myMenuItemStates: state.myMenuItemStates,
                menuItems: state.menuItems,
                tableName: state.tableName,
                restaurantTableName: state.restaurantTableName,
                resturants: state.resturants,
                editMenuItemValues: state.editMenuItemValues,
                editResturantValues: state.editResturantValues,
                editMenuOpen: state.editMenuOpen,
                editResturantOpen: state.editResturantOpen,
                setFoodChoice,
                setFoodChoices,
                scanDynamoDB,
                setresturants,
                setEditMenuItem,
                setEditMenuItemCategory,
                setEditMenuOpen,
                setEditResturantOpen,
                handleClickMenuItemEdit,
                saveMenuItem,
                updateItemDynamoDB,
                putItemDynamoDB,
                handleClickMenuItemCopy,
                saveMenuItemCopy,
                handleClickMenuItemDelete,
                handleClickResturantEdit,
                handleClickResturantCopy,
                handleClickResturantDelete,
                saveResturant,
                saveResturantCopy,
                setResturantItem,
            }}
        >
            {props.children}
        </DataAndMethodsContext.Provider>
    );
};

export default DataAndMethodsState;