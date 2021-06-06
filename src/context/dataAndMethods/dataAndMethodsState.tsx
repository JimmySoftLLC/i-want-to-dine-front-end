import React, { useReducer } from 'react';
import DataAndMethodsContext from './dataAndMethodsContext';
import DataAndMethodsReducer from './dataAndMethodsReducer';
import setMyStatesLogic from '../../model/setMyStatesLogic';
import scanDynamoDB from '../../api/scanDynamoDB';
import getMenuItemsByDate from '../../model/menuItem/getMenuItemsByDate';
import getEntertainmentItemsByDate from '../../model/entertainmentItem/getEntertainmentItemsByDate';
import sortMenuItems from '../../model/menuItem/sortMenuItems';
import sortEntertainmentItems from '../../model/entertainmentItem/sortEntertainmentItems';
import getAssociatesByDate from '../../model/associate/getAssociatesByDate';
import getMenuDaysFromRestaurants from '../../model/menuDay/getMenuDaysFromRestaurants';
import getMenuItemsForRestaurant from '../../model/menuItem/getMenuItemsForRestaurant';
import getEntertainmentItemsForRestaurant from '../../model/entertainmentItem/getEntertainmentItemsForRestaurant';
import getAssociatesForRestaurant from '../../model/associate/getAssociatesForRestaurant';
import sortAssociates from '../../model/associate/sortAssociates';
import getRestaurantById from '../../model/restaurant/getRestaurantById';
import getPhotos from '../../model/photo/getPhotos';
import knuthShuffle from '../../model/knuthShuffle';
// import getLocation from '../../model/getLocation';

import {
    noSelectedRestaurant,
    restaurantsTableName,
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
    SET_ON_SCREEN_DEBUG_MESSAGE,
    SET_PHOTOS,
    SET_RESTAURANT_PHOTOS,
    SET_PHOTO_DIALOG_DATA,
    SET_PHOTO_DIALOG_OPEN,
    SET_IMAGE_EDITOR_DATA,
    SET_TODAYS_DATE,
    SET_SELECTED_DATE,
} from '../types';

const DataAndMethodsState: any = (props: { children: any; }) => {
    const [myStatesLocalStorage] = React.useState(() => {
        let myStates: any = window.localStorage.getItem("iWantToDine.myStates");
        myStates = myStates !== null ? JSON.parse(myStates)
            : {
                // menu categories
                specials: true,
                soup: false,
                salad: false,
                appetizers: true,
                sandwich: false,
                pizza: false,
                pasta: false,
                entree: true,
                dessert: false,
                drinks: false,
                beer: false,
                coffee: false,
                wine: false,
                kids: false,

                // price categories
                dollar_1: true,
                dollar_2: true,
                dollar_3: false,

                // dates
                date_0: false,
                date_1: false,
                date_2: false,
                date_3: false,
                date_4: false,
                date_5: false,
                date_6: false,

                // ingredients
                meat: true,
                pork: false,
                poultry: false,
                fish: false,
                shellfish: false,
                vegetarian: false,
                cheese: false,
                carryout: false,

                // customer pages
                menuItems: true,
                restaurants: false,
                associates: false,
                entertainmentItems: false,
                photoSettings: false,
                info: false,
                restaurantDetail: false,

                // backend pages
                restaurantSettings: false,
                menuSettings: false,
                menuDaySettings: false,
                entertainmentSettings: false,
                associateSettings: false,
                showDescription: false,

                // sorting types
                sortTitle: true,
                sortPrice: false,
                sortDate: false,
                sortTime: true,
                sortName: false,

                lastState: 'menuItems',

                // help dialog
                helpDialogStage: 0,
                helpDialogActive: false,
                helpDialogOpen: true,
            };
        // if set to restaurant reset to menuItems since restaurant 
        // detail expects data which does not exist yet.
        if (myStates.restaurantDetail) {
            myStates.restaurantDetail = false
            myStates.menuItems = true
            myStates.lastState = 'menuItems'
        }
        // dates
        myStates.date_0 = true;
        myStates.date_1 = false;
        myStates.date_2 = false;
        myStates.date_3 = false;
        myStates.date_4 = false;
        myStates.date_5 = false;
        myStates.date_6 = false;
        return myStates
    });

    const initialState = {
        authToken: {},
        idToken: {},
        customId: '',
        logInType: 'default',
        loading: false,
        loadingDialog: false,
        myStates: myStatesLocalStorage,
        signInRegDialogType: 'false',
        menuItems: [],
        entertainmentItems: [],
        associates: [],
        menuDays: [],
        restaurantMenuItems: [],
        restaurantEntertainmentItems: [],
        restaurantPhotos: [],
        restaurantMenuDays: [],
        restaurants: [],
        associatesRestaurants: [],
        associate: {},
        menuItemDialogOpen: false,
        restaurantId: noSelectedRestaurant,
        restaurantAssociates: [],
        restaurantDetail: {},
        onScreenDebugMessage: '',
        todaysDate: Date(),
        selectedDate: Date(),
        menuItemDialogData: {
            title: '',
            description: '',
            categoryJSON: [],
            price: 0,
            id: '',
            restaurant: '',
            restaurantId: '',
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
            orderUrlLink: '',
            facebookUrlLink: '',
            twitterUrlLink: '',
            instagramUrlLink: '',
            id: '',
            menuItemIdsJSON: [],
            entertainmentItemIdsJSON: [],
            associatesJSON: [],
            menuDayIdsJSON: [],
            photosJSON: [],
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
            hideAssociate: false,
            accessLevel: 'none',
            dialogType: 'Edit',
            message: '',
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
            restaurantId: '',
            dialogType: "Edit",
        },
        entertainmentItemDialogOpen: false,
        entertainmentItemDialogData: {
            title: '',
            description: '',
            timeFrom: '',
            timeTo: '',
            imageUrl: '',
            categoryJSON: [],
            restaurantId: '',
            dialogType: 'Add',
        },
        photoDialogOpen: false,
        photoDialogData: {
            src: '',
            caption: '',
            restaurantid: '',
            dialogType: 'Add',
        },
        imageEditorData: {
            imageUrl: '',
            editMode: 'none',
            deleteFileName: '',
            width: 1,
            height: 1,
            aspectRatio: 1,
            blob: '',
            showDelete: true,
        },
        photos: [],
    };

    const [state, dispatch] = useReducer(DataAndMethodsReducer, initialState);

    // get data by date ------------------------------------------------------------------
    const getDataByDate = async (selectedDate: any) => {
        setLoading(true);
        const myRestaurants = await scanDynamoDB(restaurantsTableName);
        setRestaurants(myRestaurants.payload)
        let myMenuDays = await getMenuDaysFromRestaurants(myRestaurants.payload);
        let myEntertainmentItems = await getEntertainmentItemsByDate(myRestaurants.payload, selectedDate);
        myEntertainmentItems = await sortEntertainmentItems(myEntertainmentItems, 'sortTime');
        let myMenuItems = await getMenuItemsByDate(myMenuDays, selectedDate);
        myMenuItems = await sortMenuItems(myMenuItems, 'sortPrice');
        let myAssociates = await getAssociatesByDate(myRestaurants.payload, myMenuDays, selectedDate);
        myAssociates = sortAssociates(myAssociates, null);
        if (state.myStates.restaurantDetail) {
            let myRestaurant = getRestaurantById(myRestaurants.payload, state.restaurantDetail.id)
            myRestaurant.menuItems = getMenuItemsForRestaurant(myRestaurant, myMenuItems)
            myRestaurant.entertainmentItems = getEntertainmentItemsForRestaurant(myRestaurant, myEntertainmentItems)
            myRestaurant.associates = getAssociatesForRestaurant(myRestaurant, myAssociates)
            myRestaurant.menuDays = myMenuDays;
            setRestaurantDetail(myRestaurant);
        }
        setLoading(false);
        setMenuDays(myMenuDays);
        setMenuItems(myMenuItems);
        setAssociates(myAssociates);
        setEntertainmentItems(myEntertainmentItems);
        let myPhotos = await getPhotos(myRestaurants.payload);
        myPhotos = knuthShuffle(myPhotos);
        setPhotos(myPhotos);
        // let test = await getLocation()
        // console.log(test);
    };

    // set date -------------------------------------------------------------------------------
    const setTodaysDate = (todaysDate: any) => dispatch({ type: SET_TODAYS_DATE, payload: todaysDate });
    const setSelectedDate = (selectedDate: any) => dispatch({ type: SET_SELECTED_DATE, payload: selectedDate });

    // set loading spinner ---------------------------------------------------------------------
    const setLoading = (myBool: boolean) => dispatch({ type: SET_LOADING, payload: myBool });
    const setLoadingDialog = (myBool: any) => dispatch({ type: SET_LOADING_DIALOG, payload: myBool });

    //set my states -----------------------------------------------------
    const setMyState = async (key: any) => {
        let myNewStateChoices = JSON.parse(JSON.stringify(state.myStates))
        myNewStateChoices = setMyStatesLogic(myNewStateChoices, key)
        window.localStorage.setItem("iWantToDine.myStates", JSON.stringify(myNewStateChoices));
        setMyStates(myNewStateChoices);
    };
    const setMyStates = async (myStates: any) => { dispatch({ type: SET_MY_STATES, payload: myStates }) }

    // login dialog and authorization items ------------------------------
    const setAuthToken = async (authToken: any) => { dispatch({ type: SET_AUTH_TOKEN, payload: authToken }) }
    const setCustomId = async (customId: any) => { dispatch({ type: SET_CUSTOM_ID, payload: customId }) }
    const setIdToken = async (idToken: any) => { dispatch({ type: SET_ID_TOKEN, payload: idToken }) }
    const setLogInType = async (logInType: any) => { dispatch({ type: SET_LOGIN_TYPE, payload: logInType }) }
    const setSignInRegDialogType = async (signInRegDialogType: any) => { dispatch({ type: SET_SIGN_IN_REG_DIALOG_TYPE, payload: signInRegDialogType }) }
    const setSignInRegDialogTitle = async (signInRegDialogTitle: any) => { dispatch({ type: SET_SIGN_IN_REG_DIALOG_TITLE, payload: signInRegDialogTitle }) }

    // associates and dialog --------------------------------------------
    const setAssociateDialogDataItem = async (key: string, value: any) => {
        let associateDialogData = JSON.parse(JSON.stringify(state.associateDialogData))
        associateDialogData[key] = value;
        if (key === 'firstName') { associateDialogData['message'] = '' }
        if (key === 'lastName') { associateDialogData['message'] = '' }
        if (key === 'jobTitle') { associateDialogData['message'] = '' }
        if (key === 'bio') { associateDialogData['message'] = '' }
        if (key === 'email') { associateDialogData['message'] = '' }
        if (key === 'accessLevel') { associateDialogData['message'] = '' }
        setAssociateDialogData(associateDialogData);
    }
    const setAssociate = async (associate: any) => { dispatch({ type: SET_ASSOCIATE, payload: associate }) }
    const setAssociates = async (associates: any[]) => { dispatch({ type: SET_ASSOCIATES, payload: associates }) }
    const setAssociateDialogData = async (associateDialogData: any) => { dispatch({ type: SET_ASSOCIATE_DIALOG_DATA, payload: associateDialogData }) }
    const setAssociateDialogOpen = async (associateDialogOpen: any) => { dispatch({ type: SET_ASSOCIATE_DIALOG_OPEN, payload: associateDialogOpen }) }
    const setAssociatesRestaurants = async (associatesRestaurants: any) => { dispatch({ type: SET_ASSOCIATE_RESTAURANTS, payload: associatesRestaurants }) }

    // menu items and dialog --------------------------------------------
    const setMenuItemDialogDataItem = async (key: string, value: any) => {
        let menuItemDialogData = JSON.parse(JSON.stringify(state.menuItemDialogData))
        menuItemDialogData[key] = value;
        setMenuItemDialogData(menuItemDialogData);
    }
    const setMenuItemDialogDataCategory = async (key: string) => {
        let myNewCategories = JSON.parse(JSON.stringify(state.menuItemDialogData.categoryJSON))
        let myIndex = -1
        let keysToClear = ['specials',
            'soup',
            'salad',
            'appetizers',
            'sandwich',
            'pizza',
            'pasta',
            'entree',
            'dessert',
            'drinks',
            'kids']
        if (keysToClear.indexOf(key, 0) !== -1) {
            for (let i = 0; i < keysToClear.length; i++) {
                myIndex = myNewCategories.indexOf(keysToClear[i], 0)
                if (myIndex !== -1) {
                    myNewCategories.splice(myIndex, 1)
                }
            }
        }
        myIndex = myNewCategories.indexOf(key, 0)
        if (myIndex !== -1) {
            myNewCategories.splice(myIndex, 1)
        } else {
            myNewCategories.push(key)
        }
        setMenuItemDialogDataItem('categoryJSON', myNewCategories)
    }
    const setMenuItems = async (menuItems: any[]) => { dispatch({ type: SET_MENU_ITEMS, payload: menuItems }) }
    const setMenuItemDialogData = async (menuItemDialogData: any) => { dispatch({ type: SET_MENU_ITEM_DIALOG_DATA, payload: menuItemDialogData }) }
    const setMenuItemDialogOpen = async (menuItemDialogOpen: any) => { dispatch({ type: SET_MENU_ITEM_DIALOG_OPEN, payload: menuItemDialogOpen }) }

    // restaurant and dialog ------------------------------------------
    const setRestaurantDialogDataItem = async (key: string | number, value: any) => {
        let restaurantDialogData = JSON.parse(JSON.stringify(state.restaurantDialogData))
        restaurantDialogData[key] = value;
        setRestaurantDialogData(restaurantDialogData);
    }
    const setRestaurantDetail = async (restaurantDetail: any) => { dispatch({ type: SET_RESTAURANT, payload: restaurantDetail }) }
    const setRestaurants = async (restaurants: any) => { dispatch({ type: SET_RESTAURANTS, payload: restaurants }) }
    const setRestaurantDialogData = async (restaurantDialogData: any) => { dispatch({ type: SET_EDIT_RESTAURANTS, payload: restaurantDialogData }) }
    const setRestaurantDialogOpen = async (restaurantDialogOpen: any) => { dispatch({ type: SET_EDIT_RESTAURANTS_OPEN, payload: restaurantDialogOpen }) }
    const setRestaurantMenuItems = async (restaurantMenuItems: any) => { dispatch({ type: SET_RESTAURANT_MENU_ITEMS, payload: restaurantMenuItems }) }
    const setRestaurantEntertainmentItems = async (restaurantEntertainmentItems: any) => { dispatch({ type: SET_RESTAURANT_ENTERTAINMENT_ITEMS, payload: restaurantEntertainmentItems }) }
    const setRestaurantMenuDays = async (restaurantMenuDays: any) => { dispatch({ type: SET_RESTAURANT_MENU_DAY_ITEMS, payload: restaurantMenuDays }) }
    const setRestaurantPhotos = async (restaurantPhotos: any) => { dispatch({ type: SET_RESTAURANT_PHOTOS, payload: restaurantPhotos }) }
    const setRestaurantId = async (restaurantId: any) => { dispatch({ type: SET_RESTAURANT_ID, payload: restaurantId }) }
    const setRestaurantAssociates = async (restaurantAssociates: any) => { dispatch({ type: SET_RESTAURANT_ASSOCIATES, payload: restaurantAssociates }) }

    // menu days and dialog -----------------------------------------------
    const setMenuDays = async (menuDays: any[]) => { dispatch({ type: SET_MENU_DAYS, payload: menuDays }) }
    const setMenuDayDialogDataItem = async (key: string | number, value: any) => {
        let menuDayDialogData = JSON.parse(JSON.stringify(state.menuDayDialogData))
        menuDayDialogData[key] = value;
        setMenuDayDialogData(menuDayDialogData);
    }
    const setMenuDayDialogData = async (menuDayDialogData: any) => { dispatch({ type: SET_MENU_DAY_DIALOG_DATA, payload: menuDayDialogData }) }
    const setMenuDayDialogOpen = async (menuDayDialogOpen: any) => { dispatch({ type: SET_MENU_DAY_DIALOG_OPEN, payload: menuDayDialogOpen }) }

    // entertainment items and dialog ---------------------------------------------
    const setEntertainmentItems = async (entertainmentItems: any[]) => { dispatch({ type: SET_ENTERTAINMENT_ITEMS, payload: entertainmentItems }) }
    const setEntertainmentItemDialogDataItem = async (key: string, value: any) => {
        let entertainmentItemDialogData = JSON.parse(JSON.stringify(state.entertainmentItemDialogData))
        entertainmentItemDialogData[key] = value;
        setEntertainmentItemDialogData(entertainmentItemDialogData);
    }
    const setEntertainmentItemDialogDataCategory = async (key: any) => {
        let myNewCategories = JSON.parse(JSON.stringify(state.entertainmentItemDialogData.categoryJSON))
        let myIndex = myNewCategories.indexOf(key, 0)
        if (myIndex !== -1) {
            myNewCategories.splice(myIndex, 1)
        } else {
            myNewCategories.push(key)
        }
        setEntertainmentItemDialogDataItem('categoryJSON', myNewCategories)
    }
    const setEntertainmentItemDialogData = async (entertainmentItemDialogData: any) => { dispatch({ type: SET_ENTERTAINMENT_ITEM_DIALOG_DATA, payload: entertainmentItemDialogData }) }
    const setEntertainmentItemDialogOpen = async (entertainmentItemDialogOpen: any) => { dispatch({ type: SET_ENTERTAINMENT_ITEM_DIALOG_OPEN, payload: entertainmentItemDialogOpen }) }

    // photos and dialog -----------------------------------------------------
    const setPhotos = async (photos: any[]) => { dispatch({ type: SET_PHOTOS, payload: photos }) }
    const setPhotoDialogDataItem = async (key: string | number, value: any) => {
        let photoDialogData = JSON.parse(JSON.stringify(state.photoDialogData))
        photoDialogData[key] = value;
        setPhotoDialogData(photoDialogData);
    }
    const setPhotoDialogData = async (photoDialogData: any) => { dispatch({ type: SET_PHOTO_DIALOG_DATA, payload: photoDialogData }) }
    const setPhotoDialogOpen = async (photoDialogOpen: any) => { dispatch({ type: SET_PHOTO_DIALOG_OPEN, payload: photoDialogOpen }) }

    // image editor -----------------------------------------------------
    const setImageEditorDataItem = (key: string | number, value: any) => {
        let imageEditorData = JSON.parse(JSON.stringify(state.imageEditorData))
        imageEditorData[key] = value;
        setImageEditorData(imageEditorData);
    }
    const setImageEditorData = async (imageEditorData: any) => { dispatch({ type: SET_IMAGE_EDITOR_DATA, payload: imageEditorData }) }

    // debuging tools used for moblie debugging -------------------------------------
    const setOnScreenDebugMessage = async (onScreenDebugMessage: any) => dispatch({ type: SET_ON_SCREEN_DEBUG_MESSAGE, payload: onScreenDebugMessage });

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
                onScreenDebugMessage: state.onScreenDebugMessage,
                photos: state.photos,
                restaurantPhotos: state.restaurantPhotos,
                photoDialogData: state.photoDialogData,
                photoDialogOpen: state.photoDialogOpen,
                imageEditorData: state.imageEditorData,
                todaysDate: state.todaysDate,
                selectedDate: state.selectedDate,
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
                setOnScreenDebugMessage,
                setPhotos,
                setRestaurantPhotos,
                setPhotoDialogDataItem,
                setPhotoDialogData,
                setPhotoDialogOpen,
                setImageEditorData,
                setImageEditorDataItem,
                getDataByDate,
                setTodaysDate,
                setSelectedDate,
            }}
        >
            {props.children}
        </DataAndMethodsContext.Provider>
    );
};

export default DataAndMethodsState;