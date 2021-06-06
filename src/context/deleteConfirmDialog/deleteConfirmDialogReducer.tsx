import { SET_DIALOG, CLOSE_DIALOG } from '../types';

export default (state: any, action: { type: any; payload: any; }): any => {
    switch (action.type) {
        case SET_DIALOG:
            return action.payload;
        case CLOSE_DIALOG:
            return null;
        default:
            return state;
    }
};
