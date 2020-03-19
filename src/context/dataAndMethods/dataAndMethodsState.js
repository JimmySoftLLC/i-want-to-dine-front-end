import React, { useReducer, useContext } from 'react';
import DataAndMethodsContext from './dataAndMethodsContext';
import DataAndMethodsReducer from './dataAndMethodsReducer';
import { v4 as uuidv4 } from 'uuid';
// import AlertDialogContext from '../alertDialog/alertDialogContext';
import DeleteConfirmDialogContext from '../deleteConfirmDialog/deleteConfirmDialogContext';
// import getItemDynamoDB from '../../api/getItemDynamoDB';
import setFoodCategories from '../../model/setFoodCategories';


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
    SET_ASSOCIATE,
    SET_ASSOCIATE_DIALOG_DATA,
    SET_ASSOCIATE_DIALOG_OPEN,
} from '../types';
import {
    // tableName,
    // restaurantTableName,
    // associatesTableName,
    // apiName,
    // apiPath,
} from '../../api/apiConstants';

const DataAndMethodsState = props => {
    const initialState = {
        authToken: {},
        idToken: {},
        customId: '',
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
        signInRegDialogType: 'false',
        menuItems: [],
        restaurants: [],
        associateRestaurants: [],
        associate: {},
        menuItemDialogOpen: false,
        menuItemDialogData: {
            title: '',
            description: '',
            categoryJSON: [],
            price: 0,
            id: '',
            restaurant: '',
            restaurantId: '',
            dialogType: "Add",
        },
        restaurantDialogOpen: false,
        restaurantDialogData: {
            restaurantName: '',
            description: '',
            street: '',
            city: '',
            stateUS: '',
            zipCode: '',
            phoneNumber: '',
            urlLink: '',
            id: '',
            menuItemIdsJSON: [],
            associateIdsJSON: [],
            approved: false,
            myAssociate: {},
            dialogType: "Edit",
        },
        associateDialogOpen: false,
        associateDialogData: {
            id: '',
            canWrite: false,
            canAdmin: false,
            firstName: '',
            lastName: '',
            bio: '',
            title: '',
            email: '',
            restaurantIdsJSON: [],
            dialogType: "Edit",
        }
    };

    const [state, dispatch] = useReducer(DataAndMethodsReducer, initialState);
    // const alertDialogContext = useContext(AlertDialogContext);
    const deleteConfirmDialogContext = useContext(DeleteConfirmDialogContext);

    // menu item calls ----------------------------------------------------------------

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
                    dialogType: 'Edit',
                }
                setMenuDialogData(myEditItem);
                setMenuDialogOpen(true);
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
                setMenuDialogData(myEditItem);
                setMenuDialogOpen(true);
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
                //deleteItemDynamoDB(state.tableName, state.menuItems[i]);
                break;
            }
        }
    };

    const saveMenuItemCopy = () => {
        let myNewMenuItems = JSON.parse(JSON.stringify(state.menuItems))
        for (let i = 0; i < myNewMenuItems.length; i++) {
            if (state.menuItemDialogData.id === myNewMenuItems[i].id) {
                myNewMenuItems[i].id = uuidv4(); // create uuidv4 as the id
                myNewMenuItems[i].title = state.menuItemDialogData.title;
                myNewMenuItems[i].description = state.menuItemDialogData.description;
                myNewMenuItems[i].categoryJSON = state.menuItemDialogData.categoryJSON;
                myNewMenuItems[i].price = state.menuItemDialogData.price;
                myNewMenuItems[i].restaurant = state.menuItemDialogData.restaurant;
                //putItemDynamoDB(state.tableName, myNewMenuItems[i]);
                break;
            }
        }
    };

    // setting states and dispatch changes to the reducer ---------------------------------------------------------------------
    const setAssociateDialogDataItem = async (key, value) => {
        let associateDialogData = JSON.parse(JSON.stringify(state.associateDialogData))
        associateDialogData[key] = value;
        setAssociateDialogData(associateDialogData);
    }
    const setAssociate = async (associate) => { dispatch({ type: SET_ASSOCIATE, payload: associate }) }
    const setAssociateDialogData = async (associateDialogData) => { dispatch({ type: SET_ASSOCIATE_DIALOG_DATA, payload: associateDialogData }) }
    const setAssociateDialogOpen = async (associateDialogOpen) => { dispatch({ type: SET_ASSOCIATE_DIALOG_OPEN, payload: associateDialogOpen }) }
    const setAssociatesRestaurants = async (associateRestaurants) => { dispatch({ type: SET_ASSOCIATE_RESTAURANTS, payload: associateRestaurants }) }

    const setAuthToken = async (authToken) => { dispatch({ type: SET_AUTH_TOKEN, payload: authToken }) }
    const setCustomId = async (customId) => { dispatch({ type: SET_CUSTOM_ID, payload: customId }) }

    //set food choices
    const setFoodChoice = async key => {
        let myNewFoodChoices = JSON.parse(JSON.stringify(state.myStates))
        myNewFoodChoices = setFoodCategories(myNewFoodChoices, key)
        setFoodChoices(myNewFoodChoices);
    };
    const setFoodChoices = async (foodChoices) => { dispatch({ type: SET_FOOD_CHOICES, payload: foodChoices }) }

    const setIdToken = async (idToken) => { dispatch({ type: SET_ID_TOKEN, payload: idToken }) }
    const setLogInType = async (logInType) => { dispatch({ type: SET_LOGIN_TYPE, payload: logInType }) }

    const setMenuItemDialogDataItem = async (key, value) => {
        let menuItemDialogData = JSON.parse(JSON.stringify(state.menuItemDialogData))
        menuItemDialogData[key] = value;
        setMenuDialogData(menuItemDialogData);
    }
    const setMenuItemDialogDataCategory = async (key) => {
        let myNewCategories = JSON.parse(JSON.stringify(state.menuItemDialogData.categoryJSON))
        let myIndex = myNewCategories.indexOf(key, 0)
        if (myIndex !== -1) {
            myNewCategories.splice(myIndex, 1)
        } else {
            myNewCategories.push(key)
        }
        setMenuItemDialogDataItem('categoryJSON', myNewCategories)
    }
    const setMenuItems = async (menuItems) => { dispatch({ type: SET_MENU_ITEMS, payload: menuItems }) }
    const setMenuDialogData = async (editMenuItem) => { dispatch({ type: SET_EDIT_MENU_ITEM, payload: editMenuItem }) }
    const setMenuDialogOpen = async (menuItemDialogOpen) => { dispatch({ type: SET_EDIT_MENU_OPEN, payload: menuItemDialogOpen }) }

    const setRestaurantDialogDataItem = async (key, value) => {
        let restaurantDialogData = JSON.parse(JSON.stringify(state.restaurantDialogData))
        restaurantDialogData[key] = value;
        setRestaurantDialogData(restaurantDialogData);
    }
    const setRestaurants = async (restaurants) => { dispatch({ type: SET_RESTAURANTS, payload: restaurants }) }
    const setRestaurantDialogData = async (restaurantDialogData) => { dispatch({ type: SET_EDIT_RESTAURANTS, payload: restaurantDialogData }) }
    const setRestaurantDialogOpen = async (restaurantDialogOpen) => { dispatch({ type: SET_EDIT_RESTAURANTS_OPEN, payload: restaurantDialogOpen }) }

    const setSignInRegDialogType = async (signInRegDialogType) => { dispatch({ type: SET_SIGN_IN_REG_DIALOG_TYPE, payload: signInRegDialogType }) }
    const setSignInRegDialogTitle = async (signInRegDialogTitle) => { dispatch({ type: SET_SIGN_IN_REG_DIALOG_TITLE, payload: signInRegDialogTitle }) }

    return (
        <DataAndMethodsContext.Provider
            value={{
                myStates: state.myStates,
                myMenuItemStates: state.myMenuItemStates,
                menuItems: state.menuItems,
                tableName: state.tableName,
                restaurantTableName: state.restaurantTableName,
                restaurants: state.restaurants,
                menuItemDialogData: state.menuItemDialogData,
                restaurantDialogData: state.restaurantDialogData,
                menuItemDialogOpen: state.menuItemDialogOpen,
                restaurantDialogOpen: state.restaurantDialogOpen,
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
                associate: state.associate,
                associateDialogData: state.associateDialogData,
                associateDialogOpen: state.associateDialogOpen,
                setFoodChoice,
                setFoodChoices,
                setRestaurants,
                setMenuItemDialogDataItem,
                setMenuItemDialogDataCategory,
                setMenuDialogOpen,
                setRestaurantDialogOpen,
                handleClickMenuItemEdit,
                handleClickMenuItemCopy,
                saveMenuItemCopy,
                handleClickMenuItemDelete,
                setSignInRegDialogType,
                setSignInRegDialogTitle,
                setAuthToken,
                setIdToken,
                setCustomId,
                setLogInType,
                setAssociate,
                setMenuItems,
                setAssociatesRestaurants,
                setRestaurantDialogData,
                setRestaurantDialogDataItem,
                setAssociateDialogData,
                setAssociateDialogOpen,
                setAssociateDialogDataItem,
                setMenuDialogData,
            }}
        >
            {props.children}
        </DataAndMethodsContext.Provider>
    );
};

export default DataAndMethodsState;