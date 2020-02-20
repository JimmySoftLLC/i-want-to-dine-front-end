import {
    SET_FOOD_CHOICES,
    SET_MENU_ITEMS,
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
        default:
            return state;
    }
};
