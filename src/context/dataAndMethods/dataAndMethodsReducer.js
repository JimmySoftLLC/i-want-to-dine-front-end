import {
    SET_FOOD_CHOICES,
    SET_MENU_ITEMS,
    SET_RESTUARANTS,
    SET_EDIT_MENU_ITEM,
    SET_EDIT_MENU_OPEN,
    SET_EDIT_RESTUARANTS,
    SET_EDIT_RESTUARANTS_OPEN,
    SET_SIGN_UP_DIALOG_OPEN
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
        case SET_RESTUARANTS:
            return {
                ...state,
                Restaurants: action.payload,
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
        case SET_EDIT_RESTUARANTS:
            return {
                ...state,
                editRestaurantValues: action.payload,
            };
        case SET_EDIT_RESTUARANTS_OPEN:
            return {
                ...state,
                editRestaurantOpen: action.payload,
            };
        case SET_SIGN_UP_DIALOG_OPEN:
            return {
                ...state,
                signUpDialogOpen: action.payload,
            };
        default:
            return state;
    }
};
