import {
    SET_FOOD_CHOICES,
    SET_MENU_ITEMS,
    SET_RESTAURANTS,
    SET_MENU_STATES,
    SET_EDIT_MENU_ITEM,
} from '../types';

export default (state, action) => {
    switch (action.type) {
        case SET_FOOD_CHOICES:
            return {
                ...state,
                myStates: action.payload,
            };
        case SET_MENU_STATES:
            return {
                ...state,
                myMenuItemStates: action.payload,
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
        default:
            return state;
    }
};
