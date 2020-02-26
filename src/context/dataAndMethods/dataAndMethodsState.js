import React, { useReducer, useContext } from 'react';
import axios from 'axios';
import DataAndMethodsContext from './dataAndMethodsContext';
import DataAndMethodsReducer from './dataAndMethodsReducer';
import AlertDialogContext from '../alertDialog/alertDialogContext';
import {
    SET_FOOD_CHOICES,
    SET_MENU_ITEMS,
    SET_MENU_IDS,
} from '../types';

const DataAndMethodsState = props => {
    const initialState = {
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
        },
        menuIds: [],
        menuItems: [
            {
                title: 'Pan Seared Barramundi',
                description: 'root vegetable and cannolinni bean fry up, grilled marinated tomato, greens, olive white wine pan sauce.',
                price: 28,
                category: ['fish'],
                "id": 1,
                restaurant: 'Pines'
            },
            {
                title: 'Kurobuta Pork Chop',
                description: 'cider brined pomegranate, apple, pistachio relish, charred broccoli rabe and brown butter sage root vegetable.',
                price: 31,
                category: ['meat'],
                "id": 2,
                restaurant: 'Pines'
            },
            {
                title: 'Fettuccine & Clams',
                description: 'handmade 9 yolk pasta, watercress, red pepper bacon butter, pistachio gremolata.',
                price: 22,
                category: ['shellfish', 'pasta'],
                "id": 3,
                restaurant: 'Pines'
            },
            {
                title: 'Chicken & Duck Confit Pot Pie ',
                description: 'wild mushroom gravy, pink peppercorn crust.',
                price: 23,
                category: ['poultry'],
                "id": 4,
                restaurant: 'Pines'
            },
            {
                title: 'Bolognese',
                description: 'handmade 9 yolk pasta, prosciutto, short rib, chuck, flank, charred tomato sauce, parmesan.',
                price: 25,
                category: ['meat', 'pasta'],
                "id": 5,
                restaurant: 'Pines'
            },
            {
                title: 'Mushroom Bolognese',
                description: 'handmade 9 yolk pasta, wild foraged mushrooms, charred tomato sauce.',
                price: 17,
                category: ['vegetarian', 'pasta'],
                "id": 6,
                restaurant: 'Pines'
            },
            {
                title: 'Winter Seafood Chowder',
                description: 'fresh fish and shellfish, chesapeake broth, bacon, potatoes, carrots, toast.',
                price: 30,
                category: ['fish', 'shellfish'],
                "id": 7,
                restaurant: 'Pines'
            },
            {
                title: '24 Hour Braised Short Rib Stroganoff',
                description: 'egg noodles, kennet square mushrooms, sour cream.',
                price: 28,
                category: ['meat'],
                "id": 8,
                restaurant: 'Pines'
            },
            {
                title: 'Seared Day Boat Scallops',
                description: 'cauliflower rice risotto, fried brussel sprouts, shallots, arugula oil.',
                price: 33,
                category: ['shellfish'],
                "id": 9,
                restaurant: 'Pines'
            },
            {
                title: 'Roseda Farms Pines Burger',
                description: 'brioche, lettuce, cheddar, red onion, The Pines secret sauce, pickles, fries.',
                price: 16,
                category: ['sandwich', 'meat'],
                "id": 10,
                restaurant: 'Pines'
            },
            {
                title: 'The Pines Fried Chicken Sandwich',
                description: 'brioche, hot pepper honey, pickles, fries.',
                price: 15,
                category: ['sandwich', 'poultry'],
                "id": 11,
                restaurant: 'Pines'
            },
            {
                title: 'Maryland Scallops',
                description: 'spring pea risotto, baby carrots, confit heirloom cherry tomato, pancetta',
                price: 36,
                category: ['shellfish'],
                "id": 12,
                restaurant: 'Blue Moon'
            },
            {
                title: 'Chesapeake Rockfish',
                description: 'tomato, finderline, artichoke, asparagus, cauliflower, beurre blanc',
                price: 35,
                category: ['fish'],
                "id": 13,
                restaurant: 'Blue Moon'
            },
            {
                title: 'Vegetarian Degustation',
                description: 'made to order for specific dietary needs',
                price: 32,
                category: ['vegetarian'],
                "id": 14,
                restaurant: 'Blue Moon'
            },
            {
                title: 'Amish chicken pot pie',
                description: 'truffle velote, peas, carrots, mushrooms, pastry top',
                price: 30,
                category: ['poultry'],
                "id": 15,
                restaurant: 'Blue Moon'
            },
            {
                title: 'Short rib bourguignon',
                description: 'whipped potato, cremini, baby carrot, pearl onion, red wine',
                price: 36,
                category: ['meat'],
                "id": 16,
                restaurant: 'Blue Moon'
            },
            {
                title: 'Braised lamb bolognese',
                description: 'homemade pasta, pancetta, peas, promigiano-reggiano',
                price: 34,
                category: ['meat', 'pasta'],
                "id": 17,
                restaurant: 'Blue Moon'
            },
            {
                title: 'Duck stroganoff',
                description: 'sp\xE4tzle, mushroom, cipollini, napa cabbage, horseradish, creme fraiche',
                price: 34,
                category: ['poultry', 'pasta'],
                "id": 18,
                restaurant: 'Blue Moon'
            },
            {
                title: 'Lamb rack',
                description: '14oz All Natural',
                price: 39,
                category: ['meat'],
                "id": 19,
                restaurant: 'Blue Moon'
            },
            {
                title: 'Filet mignon',
                description: '8oz Choice Black Angus',
                price: 38,
                category: ['meat'],
                "id": 20,
                restaurant: 'Blue Moon'
            },
            {
                title: 'NY Strip',
                description: '12oz Dry Aged Black Angus',
                price: 45,
                category: ['meat'],
                "id": 21,
                restaurant: 'Blue Moon'
            },
            {
                title: 'Tomahawk Veal Chop',
                description: '16oz Milk Fed',
                price: 42,
                category: ['meat'],
                "id": 22,
                restaurant: 'Blue Moon'
            },
            {
                title: 'Le canard',
                description: 'leg of duck confit, mushroom and parmesan risotto',
                price: 34,
                category: ['poultry'],
                "id": 23,
                restaurant: 'La Fable'
            },
            {
                title: 'Coquilles st. Jacques',
                description: 'gratineed scallops, mushrooms, leeks, cream, golden cauliflower',
                price: 33,
                category: ['shellfish'],
                "id": 24,
                restaurant: 'La Fable'
            },
            {
                title: 'Boeuf bourguignon',
                description: 'slowly braised beef, smashed potatoes, mushrooms, pearl onions, root vegetables',
                price: 32,
                category: ['meat'],
                "id": 25,
                restaurant: 'La Fable'
            },
            {
                title: 'Poulet cordon bleu',
                description: 'fried chicken breast stuffed with prosciutto & gruyere, whipped fingerlings, roasted carrots, dijon',
                price: 29,
                category: ['poultry'],
                "id": 26,
                restaurant: 'La Fable'
            },
            {
                title: 'Steak au poivre',
                description: 'Daily cut of beef, cracked black pepper & cognac sauce, truffle pommes frites, frisee, red wine vinaigrette',
                price: 1000,
                category: ['meat'],
                "id": 27,
                restaurant: 'La Fable'
            },
            {
                title: 'Truite amandine',
                description: 'pan seared rainbow trout with crispy skin, buerre blanc, marcona almonds, haricots vert',
                price: 28,
                category: ['fish'],
                "id": 28,
                restaurant: 'La Fable'
            },
            {
                title: 'Homard en gnocchi',
                description: 'Baked Parisienne gnocchi, cold water lobster, peas, truffle béchamel',
                price: 32,
                category: ['pasta', 'shellfish'],
                "id": 29,
                restaurant: 'La Fable'
            },
            {
                title: 'Moules Frites',
                description: 'P.E.I. mussels, white wine, herb and garlic broth, frites, rouille French baguette',
                price: 26,
                category: ['shellfish'],
                "id": 30,
                restaurant: 'La Fable'
            },
            {
                title: 'Edens Key Lime Pie',
                description: 'graham cracker/sunflower seed crust, whipped cream',
                price: 9,
                category: ['dessert'],
                "id": 31,
                restaurant: 'Eden'
            },
            {
                title: 'Dark Chocolate Torte',
                description: 'caramel ice cream',
                price: 9,
                category: ['dessert'],
                "id": 32,
                restaurant: 'Eden'
            },
            {
                title: 'Classic Crème Brûlée',
                description: 'fresh fruit',
                price: 9,
                category: ['dessert'],
                "id": 33,
                restaurant: 'Eden'
            },
            {
                title: 'Cranberry Cobbler',
                description: 'biscuit top, vanilla ice cream',
                price: 9,
                category: ['dessert'],
                "id": 34,
                restaurant: 'Eden'
            },
            {
                title: 'S’mores Bar',
                description: 'marshmallow, graham cracker crumbs, chocolate sauce, cocoa nibs',
                price: 9,
                category: ['dessert'],
                "id": 35,
                restaurant: 'Eden'
            },
            {
                title: 'Coffee Cake',
                description: 'oatmeal streusel, crème anglaise, pumpkin spice ice cream, brown sugar toasted pumpkin seeds',
                price: 9,
                category: ['dessert'],
                "id": 36,
                restaurant: 'Eden'
            },
            {
                title: 'Chef’s Daily Whim',
                description: '',
                price: 9,
                category: ['dessert'],
                "id": 37,
                restaurant: 'Eden'
            },
            {
                title: 'Ice Cream',
                description: 'caramel, coconut, dark chocolate, hazelnut, spiced pumpkin, vanilla bean',
                price: 7,
                category: ['dessert'],
                "id": 38,
                restaurant: 'Eden'
            },
            {
                title: 'Sorbet',
                description: 'lemon, mango, pineapple, raspberry',
                price: 7,
                category: ['dessert'],
                "id": 39,
                restaurant: 'Eden'
            }
        ]
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
            return myResData.Items;
        } catch (err) {
            return [];
            alertDialogContext.setAlertDialog(true, err.message, 'Error');
        }
    };

    const getItemDynamoDB = async (TableName, menu_item_id) => {
        try {
            const res = await axios.post(
                lambdaFunctionURL,
                {
                    myBody: {
                        TableName: TableName,
                        Key: {
                            team_id: menu_item_id,
                        },
                        ReturnConsumedCapacity: 'TOTAL',
                    },
                    myMethod: 'getItem',
                },
                {
                    headers: {
                        Accept: '*/*',
                    },
                }
            );
            return (res.data.Item);
        } catch (err) {
            return {};
            alertDialogContext.setAlertDialog(true, err.message, 'Error');
        }
    };

    const setMenuIds = (menuIds) => { dispatch({ type: SET_MENU_IDS, payload: menuIds }) }
    const setMenuItems = (menuItems) => { dispatch({ type: SET_MENU_ITEMS, payload: menuItems }) }
    const setFoodChoices = (myStates) => { dispatch({ type: SET_FOOD_CHOICES, payload: myStates }) }

    return (
        <DataAndMethodsContext.Provider
            value={{
                myStates: state.myStates,
                menuItems: state.menuItems,
                setFoodChoice,
                setFoodChoices,
                scanDynamoDB,
                getItemDynamoDB,
                setMenuIds
            }}
        >
            {props.children}
        </DataAndMethodsContext.Provider>
    );
};



export default DataAndMethodsState;