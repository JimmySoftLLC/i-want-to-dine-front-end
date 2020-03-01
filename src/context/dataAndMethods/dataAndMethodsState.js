import React, { useReducer, useContext } from 'react';
import axios from 'axios';
import DataAndMethodsContext from './dataAndMethodsContext';
import DataAndMethodsReducer from './dataAndMethodsReducer';
import AlertDialogContext from '../alertDialog/alertDialogContext';
import {
    SET_FOOD_CHOICES,
    SET_MENU_ITEMS,
    SET_RESTAURANTS,
    SET_EDIT_MENU_ITEM,
    SET_EDIT_MENU_OPEN
} from '../types';

const DataAndMethodsState = props => {
    const initialState = {
        tableName: 'menuItems',
        restaurantTableName: 'resturants',
        myStates: {
            meat: false,
            poultry: false,
            pasta: false,
            sandwich: false,
            shellfish: false,
            vegetarian: false,
            dessert: false,
            info: false,
            dollar_1: false,
            dollar_2: false,
            dollar_3: false,
            special: false,
            restuarant: false,
        },
        editMenuOpen: false,
        menuItems: [],
        restaurants: [],
        editMenuItemValues: {
            title: "",
            description: "",
            category: [],
            price: 0,
            isEdit: false,
            id: "",
        }
    };

    const [state, dispatch] = useReducer(DataAndMethodsReducer, initialState);
    const alertDialogContext = useContext(AlertDialogContext);
    const lambdaFunctionURL =
        'https://yfyft0meu9.execute-api.us-east-1.amazonaws.com/default/restapi';

    //set food choices
    const setFoodChoice = async key => {
        let myNewFoodChoices = JSON.parse(JSON.stringify(state.myStates))
        let myNewMenuItems = JSON.parse(JSON.stringify(state.menuItems))
        myNewMenuItems.sort(function (a, b) {
            return a.price - b.price;
        });
        myNewFoodChoices[key] ? myNewFoodChoices[key] = false : myNewFoodChoices[key] = true;
        setMenuItems(myNewMenuItems);
        setFoodChoices(myNewFoodChoices);
    };

    const scanDynamoDB = async TableName => {
        try {
            const res = await axios.post(
                lambdaFunctionURL,
                {
                    myBody: {
                        TableName: TableName,
                    },
                    myMethod: 'scan',
                },
                {
                    headers: {
                        Accept: '*/*',
                    },
                }
            );
            let myResData = res.data;
            //console.log(myResData);
            switch (TableName) {
                case 'menuItems':
                    setMenuItems(myResData.Items)
                    break;
                case 'resturants':
                    setRestaurants(myResData.Items)
                    break;
                default:
            }

            //return myResData.Items;
        } catch (err) {
            console.log(err);
            //alertDialogContext.setAlertDialog(true, err.message, 'Error');
            switch (TableName) {
                case 'menuItems':
                    setMenuItems([])
                    break;
                case 'resturants':
                    setRestaurants([])
                    break;
                default:
            }
        }
    };

    const setEditMenuItem = async (key, value) => {
        let myEditMenuItem = JSON.parse(JSON.stringify(state.editMenuItemValues))
        myEditMenuItem[key] = value;
        editMenuItem(myEditMenuItem);
    }

    const setEditMenuItemCategory = async (key) => {
        let myNewCategories = JSON.parse(JSON.stringify(state.editMenuItemValues.category))
        let myIndex = myNewCategories.indexOf(key, 0)
        if (myIndex !== -1) {
            myNewCategories.splice(myIndex, 1)
        } else {
            myNewCategories.push(key)
        }
        setEditMenuItem('category', myNewCategories)
    }

    const handleClickOpen = (index) => {
        for (let i = 0; 1 < state.menuItems.length; i++) {
            if (index === state.menuItems[i].id) {
                console.log(state.menuItems[i].category)
                let myCategories = []
                for (let myKey in state.menuItems[i].category.contents) {
                    myCategories.push(myKey);
                }
                let myEditItem = {
                    title: state.menuItems[i].title,
                    description: state.menuItems[i].description,
                    category: myCategories,
                    price: state.menuItems[i].price,
                    id: state.menuItems[i].id,
                    isEdit: true,
                }
                editMenuItem(myEditItem);
                setEditMenuOpen(true);
                break;
            }
        }
    };

    const setMenuItems = (menuItems) => { dispatch({ type: SET_MENU_ITEMS, payload: menuItems }) }
    const setRestaurants = (restaurants) => { dispatch({ type: SET_RESTAURANTS, payload: restaurants }) }
    const setFoodChoices = (myStates) => { dispatch({ type: SET_FOOD_CHOICES, payload: myStates }) }
    const editMenuItem = (myEditMenuItem) => { dispatch({ type: SET_EDIT_MENU_ITEM, payload: myEditMenuItem }) }
    const setEditMenuOpen = (isOpen) => { dispatch({ type: SET_EDIT_MENU_OPEN, payload: isOpen }) }

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
                editMenuOpen: state.editMenuOpen,
                setFoodChoice,
                setFoodChoices,
                scanDynamoDB,
                setRestaurants,
                setEditMenuItem,
                setEditMenuItemCategory,
                setEditMenuOpen,
                handleClickOpen,
            }}
        >
            {props.children}
        </DataAndMethodsContext.Provider>
    );
};

export default DataAndMethodsState;