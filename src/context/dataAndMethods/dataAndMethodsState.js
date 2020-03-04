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
            meat: false,
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
            dollar_2: false,
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

    const lambdaFunctionURL =
        'https://yfyft0meu9.execute-api.us-east-1.amazonaws.com/default/restapi';

    //set food choices
    const setFoodChoice = async key => {
        let myNewFoodChoices = JSON.parse(JSON.stringify(state.myStates))
        myNewFoodChoices[key] ? myNewFoodChoices[key] = false : myNewFoodChoices[key] = true;
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
            alertDialogContext.setAlertDialog(true, err.message, 'Error');
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
        try {
            const res = await axios.post(
                lambdaFunctionURL,
                {
                    myBody: {
                        TableName: TableName,
                        Item: {
                            id: menuItem.id,
                            title: menuItem.title,
                            description: menuItem.description,
                            categoryJSON: JSON.stringify(menuItem.categoryJSON),
                            restaurant: menuItem.restaurant,
                            price: menuItem.price,
                        },
                        ReturnConsumedCapacity: 'TOTAL',
                    },
                    myMethod: 'putItem',
                },
                {
                    headers: {
                        Accept: '*/*',
                    },
                }
            );
            scanDynamoDB(state.tableName)
        } catch (err) {
            alertDialogContext.setAlertDialog(true, err.message, 'Error', '', 'OK', '');
        }
    };

    const putItemDynamoDB = async (TableName, menuItem) => {
        try {
            const res = await axios.post(
                lambdaFunctionURL,
                {
                    myBody: {
                        TableName: TableName,
                        Item: {
                            id: uuidv4(), // create uuidv4 as the id
                            title: menuItem.title,
                            description: menuItem.description,
                            categoryJSON: JSON.stringify(menuItem.categoryJSON),
                            restaurant: menuItem.restaurant,
                            price: menuItem.price,
                        },
                        ReturnConsumedCapacity: 'TOTAL',
                    },
                    myMethod: 'putItem',
                },
                {
                    headers: {
                        Accept: '*/*',
                    },
                }
            );
            scanDynamoDB(state.tableName)
        } catch (err) {
            alertDialogContext.setAlertDialog(true, err.message, 'Error');
        }
    };

    const deleteItemDynamoDB = async (TableName, menuItem) => {
        try {
            const res = await axios.post(
                lambdaFunctionURL,
                {
                    myMethod: 'deleteItem',
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
            scanDynamoDB(state.tableName)
        } catch (err) {
            alertDialogContext.setAlertDialog(true, err.message, 'Error');
        }
    };

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
                deleteConfirmDialogContext.setDialog(true, state.resturants[i].name, 'Delete warning', resturantId, deleteMenuItem);
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

    const saveItem = () => {
        let myNewMenuItems = JSON.parse(JSON.stringify(state.menuItems))
        for (let i = 0; i < myNewMenuItems.length; i++) {
            if (state.editMenuItemValues.id === myNewMenuItems[i].id) {
                myNewMenuItems[i].title = state.editMenuItemValues.title;
                myNewMenuItems[i].description = state.editMenuItemValues.description;
                myNewMenuItems[i].categoryJSON = state.editMenuItemValues.categoryJSON;
                myNewMenuItems[i].price = state.editMenuItemValues.price;
                updateItemDynamoDB(state.tableName, myNewMenuItems[i]);
                setMenuItems(myNewMenuItems);
                break;
            }
        }
    };

    const saveItemCopy = () => {
        let myNewMenuItems = JSON.parse(JSON.stringify(state.menuItems))
        for (let i = 0; i < myNewMenuItems.length; i++) {
            if (state.editMenuItemValues.id === myNewMenuItems[i].id) {
                myNewMenuItems[i].title = state.editMenuItemValues.title;
                myNewMenuItems[i].description = state.editMenuItemValues.description;
                myNewMenuItems[i].categoryJSON = state.editMenuItemValues.categoryJSON;
                myNewMenuItems[i].price = state.editMenuItemValues.price;
                putItemDynamoDB(state.tableName, myNewMenuItems[i]);
                setMenuItems(myNewMenuItems);
                break;
            }
        }
    };

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
                saveItem,
                updateItemDynamoDB,
                putItemDynamoDB,
                handleClickMenuItemCopy,
                saveItemCopy,
                handleClickMenuItemDelete,
                handleClickResturantEdit,
                handleClickResturantCopy,
                handleClickResturantDelete,
            }}
        >
            {props.children}
        </DataAndMethodsContext.Provider>
    );
};

export default DataAndMethodsState;