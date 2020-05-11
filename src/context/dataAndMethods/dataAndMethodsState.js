import React, { useReducer } from 'react';
import DataAndMethodsContext from './dataAndMethodsContext';
import DataAndMethodsReducer from './dataAndMethodsReducer';
import setMyStatesLogic from '../../model/setMyStatesLogic';
import {
    noSelectedRestaurant,
} from '../../api/apiConstants';

import {
    SET_MY_STATES,
    SET_MENU_ITEMS,
    SET_RESTAURANTS,
    SET_MENU_ITEM_DIALOG_DATA,
    SET_MENU_ITEM_DIALOG_OPEN,
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
    SET_RESTAURANT_MENU_ITEMS,
    SET_RESTAURANT_ID,
    SET_RESTAURANT_MENU_DAY_ITEMS,
    SET_MENU_DAY_DIALOG_OPEN,
    SET_MENU_DAY_DIALOG_DATA,
    SET_RESTAURANT_ASSOCIATES,
    SET_LOADING,
    SET_RESTAURANT,
    SET_ASSOCIATES,
    SET_MENU_DAYS,
    SET_LOADING_DIALOG,
    SET_ENTERTAINMENT_ITEMS,
    SET_ENTERTAINMENT_ITEM_DIALOG_DATA,
    SET_ENTERTAINMENT_ITEM_DIALOG_OPEN,
    SET_RESTAURANT_ENTERTAINMENT_ITEMS,
} from '../types';
import {
    // menuItemsTableName,
    // restaurantsTableName,
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
        loading: false,
        loadingDialog: false,
        myStates: {
            meat: true,
            ham: false,
            poultry: false,
            fish: false,
            shellfish: false,
            vegetarian: false,
            cheese: false,
            pasta: false,
            sandwich: false,
            dessert: false,
            special: false,
            carryout: false,
            info: false,
            dollar_1: true,
            dollar_2: true,
            dollar_3: false,
            menuItems: true,
            restaurants: false,
            associates: false,
            restaurantSettings: false,
            menuSettings: false,
            menuDaySettings: false,
            sortTitle: true,
            sortPrice: false,
            sortDate: false,
            associateSettings: false,
            sortName: false,
            restaurantDetail: false,
            entertainmentItems: false,
            entertainmentSettings: false,
        },
        signInRegDialogType: 'false',
        menuItems: [],
        entertainmentItems: [],
        associates: [],
        menuDays: [],
        restaurantMenuItems: [],
        restaurantEntertainmentItems: [],
        restaurantMenuDays: [],
        restaurants: [],
        associatesRestaurants: [],
        associate: {},
        menuItemDialogOpen: false,
        restaurantId: noSelectedRestaurant,
        restaurantAssociates: [],
        restaurantDetail: {},
        menuItemDialogData: {
            title: '',
            description: '',
            categoryJSON: [],
            price: 0,
            id: '',
            restaurant: '',
            dialogType: 'Add',
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
            entertainmentItemIdsJSON: [],
            associatesJSON: [],
            menuDayIdsJSON: [],
            approved: false,
            myAssociate: {},
            dialogType: 'Edit',
        },
        associateDialogOpen: false,
        associateDialogData: {
            id: '',
            firstName: '',
            lastName: '',
            bio: '',
            jobTitle: '',
            email: '',
            restaurantIdsJSON: [],
            accessLevel: 'none',
            dialogType: 'Edit',
            imageUrl: '',
            message: '',
            pictureEditMode: 'none',
        },
        menuDayDialogOpen: false,
        menuDayDialogData: {
            id: '',
            title: '',
            dateFrom: '',
            dateTo: '',
            description: '',
            menuItemIdsJSON: [],
            entertainmentItemIdsJSON: [],
            associatesJSON: [],
            dialogType: "Edit",
        },
        entertainmentItemDialogData: {
            title: '',
            description: '',
            timeFrom: '',
            timeTo: '',
            imageUrl: '',
            categoryJSON: [],
            dialogType: 'Add',
        },
        entertainmentItemDialogOpen: false,
    };

    const [state, dispatch] = useReducer(DataAndMethodsReducer, initialState);

    // setting states and dispatch changes to the reducer ---------------------------------------------------------------------
    const setLoading = (myBool) => dispatch({ type: SET_LOADING, payload: myBool });
    const setLoadingDialog = (myBool) => dispatch({ type: SET_LOADING_DIALOG, payload: myBool });

    const setAssociateDialogDataItem = async (key, value) => {
        let associateDialogData = JSON.parse(JSON.stringify(state.associateDialogData))
        associateDialogData[key] = value;
        if (key === 'firstName') { associateDialogData['message'] = '' }
        if (key === 'lastName') { associateDialogData['message'] = '' }
        if (key === 'jobTitle') { associateDialogData['message'] = '' }
        if (key === 'bio') { associateDialogData['message'] = '' }
        if (key === 'email') { associateDialogData['message'] = '' }
        if (key === 'accessLevel') { associateDialogData['message'] = '' }
        setAssociateDialogData(associateDialogData);
        // console.log(key, value);
    }
    const setAssociate = async (associate) => { dispatch({ type: SET_ASSOCIATE, payload: associate }) }
    const setAssociates = async (associates) => { dispatch({ type: SET_ASSOCIATES, payload: associates }) }
    const setAssociateDialogData = async (associateDialogData) => { dispatch({ type: SET_ASSOCIATE_DIALOG_DATA, payload: associateDialogData }) }
    const setAssociateDialogOpen = async (associateDialogOpen) => { dispatch({ type: SET_ASSOCIATE_DIALOG_OPEN, payload: associateDialogOpen }) }
    const setAssociatesRestaurants = async (associatesRestaurants) => { dispatch({ type: SET_ASSOCIATE_RESTAURANTS, payload: associatesRestaurants }) }

    const setAuthToken = async (authToken) => { dispatch({ type: SET_AUTH_TOKEN, payload: authToken }) }
    const setCustomId = async (customId) => { dispatch({ type: SET_CUSTOM_ID, payload: customId }) }

    //set my states
    const setMyState = async key => {
        let myNewFoodChoices = JSON.parse(JSON.stringify(state.myStates))
        myNewFoodChoices = setMyStatesLogic(myNewFoodChoices, key)
        setMyStates(myNewFoodChoices);
    };
    const setMyStates = async (myStates) => { dispatch({ type: SET_MY_STATES, payload: myStates }) }

    const setIdToken = async (idToken) => { dispatch({ type: SET_ID_TOKEN, payload: idToken }) }
    const setLogInType = async (logInType) => { dispatch({ type: SET_LOGIN_TYPE, payload: logInType }) }

    const setMenuItemDialogDataItem = async (key, value) => {
        let menuItemDialogData = JSON.parse(JSON.stringify(state.menuItemDialogData))
        menuItemDialogData[key] = value;
        setMenuItemDialogData(menuItemDialogData);
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
    const setMenuItemDialogData = async (menuItemDialogData) => { dispatch({ type: SET_MENU_ITEM_DIALOG_DATA, payload: menuItemDialogData }) }
    const setMenuItemDialogOpen = async (menuItemDialogOpen) => { dispatch({ type: SET_MENU_ITEM_DIALOG_OPEN, payload: menuItemDialogOpen }) }

    const setRestaurantDialogDataItem = async (key, value) => {
        let restaurantDialogData = JSON.parse(JSON.stringify(state.restaurantDialogData))
        restaurantDialogData[key] = value;
        setRestaurantDialogData(restaurantDialogData);
    }
    const setRestaurantDetail = async (restaurantDetail) => { dispatch({ type: SET_RESTAURANT, payload: restaurantDetail }) }
    const setRestaurants = async (restaurants) => { dispatch({ type: SET_RESTAURANTS, payload: restaurants }) }
    const setRestaurantDialogData = async (restaurantDialogData) => { dispatch({ type: SET_EDIT_RESTAURANTS, payload: restaurantDialogData }) }
    const setRestaurantDialogOpen = async (restaurantDialogOpen) => { dispatch({ type: SET_EDIT_RESTAURANTS_OPEN, payload: restaurantDialogOpen }) }
    const setRestaurantMenuItems = async (restaurantMenuItems) => { dispatch({ type: SET_RESTAURANT_MENU_ITEMS, payload: restaurantMenuItems }) }
    const setRestaurantEntertainmentItems = async (restaurantEntertainmentItems) => { dispatch({ type: SET_RESTAURANT_ENTERTAINMENT_ITEMS, payload: restaurantEntertainmentItems }) }
    const setRestaurantMenuDays = async (restaurantMenuDays) => { dispatch({ type: SET_RESTAURANT_MENU_DAY_ITEMS, payload: restaurantMenuDays }) }
    const setRestaurantId = async (restaurantId) => { dispatch({ type: SET_RESTAURANT_ID, payload: restaurantId }) }
    const setRestaurantAssociates = async (restaurantAssociates) => { dispatch({ type: SET_RESTAURANT_ASSOCIATES, payload: restaurantAssociates }) }

    const setSignInRegDialogType = async (signInRegDialogType) => { dispatch({ type: SET_SIGN_IN_REG_DIALOG_TYPE, payload: signInRegDialogType }) }
    const setSignInRegDialogTitle = async (signInRegDialogTitle) => { dispatch({ type: SET_SIGN_IN_REG_DIALOG_TITLE, payload: signInRegDialogTitle }) }

    const setMenuDays = async (menuDays) => { dispatch({ type: SET_MENU_DAYS, payload: menuDays }) }
    const setMenuDayDialogDataItem = async (key, value) => {
        let menuDayDialogData = JSON.parse(JSON.stringify(state.menuDayDialogData))
        menuDayDialogData[key] = value;
        setMenuDayDialogData(menuDayDialogData);
    }
    const setMenuDayDialogData = async (menuDayDialogData) => { dispatch({ type: SET_MENU_DAY_DIALOG_DATA, payload: menuDayDialogData }) }
    const setMenuDayDialogOpen = async (menuDayDialogOpen) => { dispatch({ type: SET_MENU_DAY_DIALOG_OPEN, payload: menuDayDialogOpen }) }

    const setEntertainmentItems = async (entertainmentItems) => { dispatch({ type: SET_ENTERTAINMENT_ITEMS, payload: entertainmentItems }) }
    const setEntertainmentItemDialogDataItem = async (key, value) => {
        let entertainmentItemDialogData = JSON.parse(JSON.stringify(state.entertainmentItemDialogData))
        entertainmentItemDialogData[key] = value;
        setEntertainmentItemDialogData(entertainmentItemDialogData);
    }
    const setEntertainmentItemDialogDataCategory = async (key) => {
        let myNewCategories = JSON.parse(JSON.stringify(state.entertainmentItemDialogData.categoryJSON))
        let myIndex = myNewCategories.indexOf(key, 0)
        if (myIndex !== -1) {
            myNewCategories.splice(myIndex, 1)
        } else {
            myNewCategories.push(key)
        }
        setEntertainmentItemDialogDataItem('categoryJSON', myNewCategories)
    }
    const setEntertainmentItemDialogData = async (entertainmentItemDialogData) => { dispatch({ type: SET_ENTERTAINMENT_ITEM_DIALOG_DATA, payload: entertainmentItemDialogData }) }
    const setEntertainmentItemDialogOpen = async (entertainmentItemDialogOpen) => { dispatch({ type: SET_ENTERTAINMENT_ITEM_DIALOG_OPEN, payload: entertainmentItemDialogOpen }) }

    return (
        <DataAndMethodsContext.Provider
            value={{
                myStates: state.myStates,
                myMenuItemStates: state.myMenuItemStates,
                menuItems: state.menuItems,
                menuItemsTableName: state.menuItemsTableName,
                restaurantsTableName: state.restaurantsTableName,
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
                logInType: state.logInType,
                customId: state.customId,
                associatesRestaurants: state.associatesRestaurants,
                associate: state.associate,
                associateDialogData: state.associateDialogData,
                associateDialogOpen: state.associateDialogOpen,
                restaurantMenuItems: state.restaurantMenuItems,
                restaurantEntertainmentItems: state.restaurantEntertainmentItems,
                restaurantId: state.restaurantId,
                restaurantMenuDays: state.restaurantMenuDays,
                menuDayDialogData: state.menuDayDialogData,
                menuDayDialogOpen: state.menuDayDialogOpen,
                restaurantAssociates: state.restaurantAssociates,
                loading: state.loading,
                loadingDialog: state.loadingDialog,
                restaurantDetail: state.restaurantDetail,
                associates: state.associates,
                menuDays: state.menuDays,
                entertainmentItems: state.entertainmentItems,
                entertainmentItemDialogData: state.entertainmentItemDialogData,
                entertainmentItemDialogDataItem: state.entertainmentItemDialogDataItem,
                entertainmentItemDialogOpen: state.entertainmentItemDialogOpen,
                setMyState,
                setMyStates,
                setRestaurants,
                setMenuItemDialogDataItem,
                setMenuItemDialogDataCategory,
                setMenuItemDialogOpen,
                setRestaurantDialogOpen,
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
                setMenuItemDialogData,
                setRestaurantMenuItems,
                setRestaurantId,
                setRestaurantMenuDays,
                setMenuDayDialogData,
                setMenuDayDialogOpen,
                setMenuDayDialogDataItem,
                setRestaurantAssociates,
                setLoading,
                setRestaurantDetail,
                setAssociates,
                setMenuDays,
                setLoadingDialog,
                setEntertainmentItems,
                setEntertainmentItemDialogData,
                setEntertainmentItemDialogDataItem,
                setEntertainmentItemDialogOpen,
                setEntertainmentItemDialogDataCategory,
                setRestaurantEntertainmentItems,
            }}
        >
            {props.children}
        </DataAndMethodsContext.Provider>
    );
};

export default DataAndMethodsState;


