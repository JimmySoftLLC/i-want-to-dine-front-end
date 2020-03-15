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

export default (state, action) => {
    switch (action.type) {
        case SET_FOOD_CHOICES:
            return {
                ...state,
                myStates: action.payload,
            };
        case SET_MENU_ITEMS:
            return {
                ...state,
                menuItems: action.payload,
            };
        case SET_RESTAURANTS:
            return {
                ...state,
                restaurants: action.payload,
            };
        case SET_EDIT_MENU_ITEM:
            return {
                ...state,
                editMenuItemValues: action.payload,
            };
        case SET_EDIT_MENU_OPEN:
            return {
                ...state,
                editMenuOpen: action.payload,
            };
        case SET_EDIT_RESTAURANTS:
            return {
                ...state,
                editRestaurantValues: action.payload,
            };
        case SET_EDIT_RESTAURANTS_OPEN:
            return {
                ...state,
                editRestaurantOpen: action.payload,
            };
        case SET_SIGN_IN_REG_DIALOG_TYPE:
            return {
                ...state,
                signInRegDialogType: action.payload,
            };
        case SET_SIGN_IN_REG_DIALOG_TITLE:
            return {
                ...state,
                signInRegDialogTitle: action.payload,
            };
        case SET_AUTH_TOKEN:
            return {
                ...state,
                authToken: action.payload,
            };
        case SET_ID_TOKEN:
            return {
                ...state,
                idToken: action.payload,
            };
        case SET_CUSTOM_ID:
            return {
                ...state,
                customId: action.payload,
            };
        case SET_LOGIN_TYPE:
            return {
                ...state,
                logInType: action.payload,
            };
        case SET_ASSOCIATE_RESTAURANTS:
            return {
                ...state,
                associateRestaurants: action.payload,
            };
        default:
            return state;
    }
};
