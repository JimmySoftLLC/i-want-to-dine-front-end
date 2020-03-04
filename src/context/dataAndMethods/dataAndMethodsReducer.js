import {
    SET_FOOD_CHOICES,
    SET_MENU_ITEMS,
    SET_resturants,
    SET_EDIT_MENU_ITEM,
    SET_EDIT_MENU_OPEN,
    SET_EDIT_RESTURANT,
    SET_EDIT_RESTURANT_OPEN
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
        case SET_resturants:
            return {
                ...state,
                resturants: action.payload,
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
        case SET_EDIT_RESTURANT:
            return {
                ...state,
                editResturantValues: action.payload,
            };
        case SET_EDIT_RESTURANT_OPEN:
            return {
                ...state,
                editResturantOpen: action.payload,
            };
        default:
            return state;
    }
};
