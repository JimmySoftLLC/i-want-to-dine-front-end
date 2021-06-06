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
    SET_ON_SCREEN_DEBUG_MESSAGE,
    SET_PHOTOS,
    SET_RESTAURANT_PHOTOS,
    SET_PHOTO_DIALOG_DATA,
    SET_PHOTO_DIALOG_OPEN,
    SET_IMAGE_EDITOR_DATA,
    SET_TODAYS_DATE,
    SET_SELECTED_DATE,
} from '../types';

export default (state, action) => {
    switch (action.type) {
        case SET_MY_STATES:
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
        case SET_MENU_ITEM_DIALOG_DATA:
            return {
                ...state,
                menuItemDialogData: action.payload,
            };
        case SET_MENU_ITEM_DIALOG_OPEN:
            return {
                ...state,
                menuItemDialogOpen: action.payload,
            };
        case SET_EDIT_RESTAURANTS:
            return {
                ...state,
                restaurantDialogData: action.payload,
            };
        case SET_EDIT_RESTAURANTS_OPEN:
            return {
                ...state,
                restaurantDialogOpen: action.payload,
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
                associatesRestaurants: action.payload,
            };
        case SET_ASSOCIATE:
            return {
                ...state,
                associate: action.payload,
            };
        case SET_ASSOCIATE_DIALOG_DATA:
            return {
                ...state,
                associateDialogData: action.payload,
            };
        case SET_ASSOCIATE_DIALOG_OPEN:
            return {
                ...state,
                associateDialogOpen: action.payload,
            };
        case SET_RESTAURANT_MENU_ITEMS:
            return {
                ...state,
                restaurantMenuItems: action.payload,
            };
        case SET_RESTAURANT_ID:
            return {
                ...state,
                restaurantId: action.payload,
            };
        case SET_RESTAURANT_MENU_DAY_ITEMS:
            return {
                ...state,
                restaurantMenuDays: action.payload,
            };
        case SET_MENU_DAY_DIALOG_OPEN:
            return {
                ...state,
                menuDayDialogOpen: action.payload,
            };
        case SET_MENU_DAY_DIALOG_DATA:
            return {
                ...state,
                menuDayDialogData: action.payload,
            };
        case SET_RESTAURANT_ASSOCIATES:
            return {
                ...state,
                restaurantAssociates: action.payload,
            };
        case SET_LOADING:
            return {
                ...state,
                loading: action.payload,
            };
        case SET_RESTAURANT:
            return {
                ...state,
                restaurantDetail: action.payload,
            };
        case SET_ASSOCIATES:
            return {
                ...state,
                associates: action.payload,
            };
        case SET_MENU_DAYS:
            return {
                ...state,
                menuDays: action.payload,
            };
        case SET_LOADING_DIALOG:
            return {
                ...state,
                loadingDialog: action.payload,
            };
        case SET_ENTERTAINMENT_ITEMS:
            return {
                ...state,
                entertainmentItems: action.payload,
            };
        case SET_ENTERTAINMENT_ITEM_DIALOG_DATA:
            return {
                ...state,
                entertainmentItemDialogData: action.payload,
            };
        case SET_ENTERTAINMENT_ITEM_DIALOG_OPEN:
            return {
                ...state,
                entertainmentItemDialogOpen: action.payload,
            };
        case SET_RESTAURANT_ENTERTAINMENT_ITEMS:
            return {
                ...state,
                restaurantEntertainmentItems: action.payload,
            };
        case SET_ON_SCREEN_DEBUG_MESSAGE:
            return {
                ...state,
                onScreenDebugMessage: action.payload,
            };
        case SET_PHOTOS:
            return {
                ...state,
                photos: action.payload,
            };
        case SET_RESTAURANT_PHOTOS:
            return {
                ...state,
                restaurantPhotos: action.payload,
            };
        case SET_PHOTO_DIALOG_DATA:
            return {
                ...state,
                photoDialogData: action.payload,
            };
        case SET_PHOTO_DIALOG_OPEN:
            return {
                ...state,
                photoDialogOpen: action.payload,
            };
        case SET_IMAGE_EDITOR_DATA:
            return {
                ...state,
                imageEditorData: action.payload,
            };
        case SET_TODAYS_DATE:
            return {
                ...state,
                todaysDate: action.payload,
            };
        case SET_SELECTED_DATE:
            return {
                ...state,
                selectedDate: action.payload,
            };
        default:
            return state;
    }
};