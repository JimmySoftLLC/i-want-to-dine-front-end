import React, { useReducer, useContext } from 'react';
import DataAndMethodsContext from './dataAndMethodsContext';
import DataAndMethodsReducer from './dataAndMethodsReducer';
import { v4 as uuidv4 } from 'uuid';
import AlertDialogContext from '../alertDialog/alertDialogContext';
import DeleteConfirmDialogContext from '../deleteConfirmDialog/deleteConfirmDialogContext';
import getItemDynamoDB from '../../api/getItemDynamoDB';
import putItemDynamoDB from '../../api/putItemDynamoDB';
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
} from '../types';
import {
    tableName,
    restaurantTableName,
    associatesTableName,
    apiName,
    apiPath,
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
        editMenuOpen: false,
        signInRegDialogType: 'false',
        editRestaurantOpen: false,
        menuItems: [],
        restaurants: [],
        associateRestaurants: [],
        associate: {},
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
            stateUS: "",
            zipCode: "",
            phoneNumber: "",
            urlLink: "",
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

    //set food choices
    const setFoodChoice = async key => {
        let myNewFoodChoices = JSON.parse(JSON.stringify(state.myStates))
        myNewFoodChoices[key] ? myNewFoodChoices[key] = false : myNewFoodChoices[key] = true;
        setFoodChoices(myNewFoodChoices);
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
                //deleteItemDynamoDB(state.tableName, state.menuItems[i]);
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
                //putItemDynamoDB(state.tableName, myNewMenuItems[i]);
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
                //putItemDynamoDB(state.tableName, myNewMenuItems[i]);
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
                    stateUS: state.restaurants[i].stateUS,
                    zipCode: state.restaurants[i].zipCode,
                    phoneNumber: state.restaurants[i].phoneNumber,
                    urlLink: state.restaurants[i].urlLink,
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
                    stateUS: state.restaurants[i].stateUS,
                    zipCode: state.restaurants[i].zipCode,
                    phoneNumber: state.restaurants[i].phoneNumber,
                    urlLink: state.restaurants[i].urlLink,
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
                myNewRestaurants[i].stateUS = state.editRestaurantValues.stateUS;
                myNewRestaurants[i].zipCode = state.editRestaurantValues.zipCode;
                myNewRestaurants[i].phoneNumber = state.editRestaurantValues.phoneNumber;
                myNewRestaurants[i].urlLink = state.editRestaurantValues.urlLink;
                myNewRestaurants[i].menuItemIdsJSON = state.editRestaurantValues.menuItemIdsJSON
                myNewRestaurants[i].associateIdsJSON = state.editRestaurantValues.associateIdsJSON
                myNewRestaurants[i].approved = state.editRestaurantValues.approved
                //putItemDynamoDB(state.restaurantTableName, myNewRestaurants[i]);
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
                myNewRestaurant.stateUS = state.editRestaurantValues.stateUS;
                myNewRestaurant.zipCode = state.editRestaurantValues.zipCode;
                myNewRestaurant.phoneNumber = state.editRestaurantValues.phoneNumber;
                myNewRestaurant.urlLink = state.editRestaurantValues.urlLink;
                myNewRestaurant.menuItemIdsJSON = state.editRestaurantValues.menuItemIdsJSON
                myNewRestaurant.associateIdsJSON = state.editRestaurantValues.associateIdsJSON
                myNewRestaurant.approved = state.editRestaurantValues.approved
                myNewRestaurants.push(myNewRestaurant);
                //putItemDynamoDB(state.restaurantTableName, myNewRestaurant);
                //getAssociatesResturants(myNewRestaurants, state.customId)
                break;
            }
        }
    };

    const deleteRestaurant = (RestaurantId) => {
        let myNewRestaurants = JSON.parse(JSON.stringify(state.restaurants))
        for (let i = 0; 1 < myNewRestaurants.length; i++) {
            if (RestaurantId === myNewRestaurants[i].id) {
                //deleteItemDynamoDB(state.restaurantTableName, myNewRestaurants[i]);
                myNewRestaurants.splice(i, 1);
                break;
            }
        }
    };

    const saveAssociate = async () => {
        let myRestaurantIdsJSON = [];
        for (let i = 0; i < state.restaurants.length; i++) {
            myRestaurantIdsJSON.push(state.restaurants[i].id);
        }
        let myAssociate = {
            id: state.customId, // create uuidv4 as the id,
            canWrite: false,
            canAdmin: false,
            firstName: "James",
            lastName: "Bailey",
            email: "jbailey969@gmail.com",
            restaurantIdsJSON: myRestaurantIdsJSON,
        }
        console.log(myAssociate)
        const data = await putItemDynamoDB(associatesTableName, state.idToken, myAssociate, state.customId)
        console.log(data);
    }

    // dispatch changes to the reducer ---------------------------------------------------------------------
    const setMenuItems = async (menuItems) => { dispatch({ type: SET_MENU_ITEMS, payload: menuItems }) }
    const setRestaurants = async (restaurants) => { dispatch({ type: SET_RESTAURANTS, payload: restaurants }) }
    const setFoodChoices = async (myStates) => { dispatch({ type: SET_FOOD_CHOICES, payload: myStates }) }
    const editMenuItem = async (myEditMenuItem) => { dispatch({ type: SET_EDIT_MENU_ITEM, payload: myEditMenuItem }) }
    const setEditMenuOpen = async (isOpen) => { dispatch({ type: SET_EDIT_MENU_OPEN, payload: isOpen }) }
    const editRestaurant = async (myRestaurant) => { dispatch({ type: SET_EDIT_RESTAURANTS, payload: myRestaurant }) }
    const setEditRestaurantOpen = async (isOpen) => { dispatch({ type: SET_EDIT_RESTAURANTS_OPEN, payload: isOpen }) }
    const setSignInRegDialogType = async (type) => { dispatch({ type: SET_SIGN_IN_REG_DIALOG_TYPE, payload: type }) }
    const setSignInRegDialogTitle = async (title) => { dispatch({ type: SET_SIGN_IN_REG_DIALOG_TITLE, payload: title }) }
    const setAuthToken = async (authToken) => { dispatch({ type: SET_AUTH_TOKEN, payload: authToken }) }
    const setIdToken = async (idToken) => { dispatch({ type: SET_ID_TOKEN, payload: idToken }) }
    const setCustomId = async (customId) => { dispatch({ type: SET_CUSTOM_ID, payload: customId }) }
    const setLogInType = async (logInType) => { dispatch({ type: SET_LOGIN_TYPE, payload: logInType }) }
    const setAssociateRestaurants = async (associateRestaurants) => { dispatch({ type: SET_ASSOCIATE_RESTAURANTS, payload: associateRestaurants }) }
    const setAssociate = async (associate) => { dispatch({ type: SET_ASSOCIATE, payload: associate }) }

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
                associate: state.associate,
                setFoodChoice,
                setFoodChoices,
                setRestaurants,
                setEditMenuItem,
                setEditMenuItemCategory,
                setEditMenuOpen,
                setEditRestaurantOpen,
                handleClickMenuItemEdit,
                saveMenuItem,
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
                setAssociate,
                setMenuItems,
                setAssociateRestaurants,
            }}
        >
            {props.children}
        </DataAndMethodsContext.Provider>
    );
};

export default DataAndMethodsState;