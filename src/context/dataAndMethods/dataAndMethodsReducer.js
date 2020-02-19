import {
    SET_FOOD_CHOICES,
} from '../types';

export default (state, action) => {
    switch (action.type) {
        case SET_FOOD_CHOICES:
            return {
                ...state,
                myStates: action.payload,
            };
        default:
            return state;
    }
};
