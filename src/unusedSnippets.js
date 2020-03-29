const updateMenuIdsForRestaurant = async (restaurantItem, menuItems) => {
    let myMenuItemIds = [];
    for (let i = 0; i < menuItems.length; i++) {
        if (restaurantItem.name === menuItems[i].restaurant) {
            myMenuItemIds.push(menuItems[i].id)
        }
    }
    restaurantItem.menuItemIdsJSON = myMenuItemIds;
    putItemDynamoDB(restaurantsTableName, restaurantItem)
}

const updateAssociateIdsForRestaurant = async (restaurantItem) => {
    let myAssociateIdsJSON = ['3fb19b1a-e35a-4b72-aa81-03594ab73a69'];
    restaurantItem.associateIdsJSON = myAssociateIdsJSON;
    putItemDynamoDB(restaurantsTableName, restaurantItem)
}


// import { Auth } from 'aws-amplify';
const Auth = require('aws-amplify');
const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool;
const AWS = require('aws-sdk');
const request = require('request');
const jwkToPem = require('jwk-to-pem');
const jwt = require('jsonwebtoken');
global.fetch = require('node-fetch');

const poolData = {
    UserPoolId: "us-east-1_4ajU9e1Yn", // Your user pool id here    
    ClientId: "2e70bconmpetsff86vakbqikn1" // Your client id here
};
const pool_region = 'us-east-1';
const userPool = new CognitoUserPool(poolData);

let cognitoUser = {}

// const registerUser = async (userName, password) => {
//     // try {
//     //     const params = {
//     //         username: this.state.email.replace(/[@.]/g, '|'),
//     //         password: this.state.password,
//     //         attributes: {
//     //             email: this.state.email,
//     //             phone_number: this.state.phone
//     //         },
//     //         validationData: []
//     //     };
//     //     const data = await Auth.signUp(params);
//     // } catch (err) {
//     //     console.error(err.message)
//     // }
// }

const registerUser = async (userName, password) => {
    var attributeList = [];
    // attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"name",Value:"Prasad Jayashanka"}));
    // attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"preferred_username",Value:"jay"}));
    // attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"gender",Value:"male"}));
    // attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"birthdate",Value:"1991-06-21"}));
    // attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"address",Value:"CMB"}));
    attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({ Name: "email", Value: userName }));
    attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({ Name: "phone_number", Value: "+17035551212" }));
    // attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"custom:scope",Value:"admin"}));
    // try {
    //     const result = await userPool.signUp(userName, password, attributeList)
    //     cognitoUser = result.user;
    //     console.log(cognitoUser)
    //     console.log('user name is ' + cognitoUser.getUsername());
    // } catch (err) {
    //     console.log(err);
    //     return;
    // }
    userPool.signUp(userName, password, attributeList, null, function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
        cognitoUser = result.user;
        console.log(cognitoUser)
        console.log('user name is ' + cognitoUser.getUsername());
    });
}

const login = (userName, password) => {
    var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
        Username: userName,
        Password: password,
    });

    var userData = {
        Username: userName,
        Pool: userPool
    };
    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
            console.log('access token + ' + result.getAccessToken().getJwtToken());
            console.log('id token + ' + result.getIdToken().getJwtToken());
            console.log('refresh token + ' + result.getRefreshToken().getToken());
            validateToken(result.getAccessToken().getJwtToken())
            return "result.getAccessToken().getJwtToken()"
        },
        onFailure: function (err) {
            console.log(err);
        },
    });
}

const update = (username, password) => {
    var attributeList = [];
    attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({
        Name: "custom:scope",
        Value: "some new value"
    }));
    attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({
        Name: "name",
        Value: "some new value"
    }));

    var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
        Username: username,
        Password: password,
    });

    var userData = {
        Username: username,
        Pool: userPool
    };
    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

    cognitoUser.updateAttributes(attributeList, (err, result) => {
        if (err) {
            //handle error
        } else {
            console.log(result);
        }
    });
}

let pems = {};

const validateToken = (token) => {
    request({
        url: `https://cognito-idp.${pool_region}.amazonaws.com/${poolData.UserPoolId}/.well-known/jwks.json`,
        json: true
    }, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            pems = {};
            var keys = body['keys'];
            for (var i = 0; i < keys.length; i++) {
                //Convert each key to PEM
                var key_id = keys[i].kid;
                var modulus = keys[i].n;
                var exponent = keys[i].e;
                var key_type = keys[i].kty;
                var jwk = { kty: key_type, n: modulus, e: exponent };
                var pem = jwkToPem(jwk);
                pems[key_id] = pem;
            }
            //validate the token
            var decodedJwt = jwt.decode(token, { complete: true });
            if (!decodedJwt) {
                console.log("Not a valid JWT token");
                return;
            }

            var kid = decodedJwt.header.kid;
            var pem = pems[kid];
            if (!pem) {
                console.log('Invalid token');
                return;
            }

            jwt.verify(token, pem, function (err, payload) {
                if (err) {
                    console.log("Invalid Token.");
                } else {
                    console.log("Valid Token.");
                    console.log(pem, payload);
                }
            });
        } else {
            console.log("Error! Unable to download JWKs");
        }
    });
}

const renew = () => {
    const RefreshToken = new AmazonCognitoIdentity.CognitoRefreshToken({ RefreshToken: "your_refresh_token_from_a_previous_login" });

    const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

    const userData = {
        Username: "sample@gmail.com",
        Pool: userPool
    };

    const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

    cognitoUser.refreshSession(RefreshToken, (err, session) => {
        if (err) {
            console.log(err);
        } else {
            let retObj = {
                "access_token": session.accessToken.jwtToken,
                "id_token": session.idToken.jwtToken,
                "refresh_token": session.refreshToken.token,
            }
            console.log(retObj);
        }
    })
}

let username = "";
let password = "";


const deleteUser = () => {
    var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
        Username: username,
        Password: password,
    });

    var userData = {
        Username: username,
        Pool: userPool
    };
    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
            cognitoUser.deleteUser((err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Successfully deleted the user.");
                    console.log(result);
                }
            });
        },
        onFailure: function (err) {
            console.log(err);
        },
    });
}

const deleteAttributes = (username, password) => {
    var attributeList = [];
    attributeList.push("custom:scope");
    attributeList.push("name");

    var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
        Username: username,
        Password: password,
    });

    var userData = {
        Username: username,
        Pool: userPool
    };
    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

    cognitoUser.deleteAttributes(attributeList, (err, result) => {
        if (err) {
            //handle error
        } else {
            console.log(result);
        }
    });
}

const changePassword = (username, password, newpassword) => {
    var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
        Username: username,
        Password: password,
    });

    var userData = {
        Username: username,
        Pool: userPool
    };
    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
            cognitoUser.changePassword(password, newpassword, (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Successfully changed password of the user.");
                    console.log(result);
                }
            });
        },
        onFailure: function (err) {
            console.log(err);
        },
    });
}

// module.exports = {
//     registerUser: registerUser,
//     login: login,
//     update: update,
//     validateToken: validateToken,
//     renew: renew,
//     deleteUser: deleteUser,
//     deleteAttributes: deleteAttributes,
//     changePassword: changePassword,
// };



import React, { useReducer, useContext } from 'react';
import DataAndMethodsContext from './dataAndMethodsContext';
import DataAndMethodsReducer from './dataAndMethodsReducer';
import { v4 as uuidv4 } from 'uuid';
import AlertDialogContext from '../alertDialog/alertDialogContext';
import DeleteConfirmDialogContext from '../deleteConfirmDialog/deleteConfirmDialogContext';
import getItemDynamoDB from '../../api/getItemDynamoDB';
import putItemDynamoDB from '../../api/putItemDynamoDB';
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
} from '../types';
import {
    menuItemsTableName,
    restaurantsTableName,
    associatesTableName,
    apiName,
    apiPath,
} from '../../api/apiConstants';

const DataAndMethodsState = props => {
    const initialState = {
        authToken: {},
        idToken: {},
        customId: '',
        logInType: 'default',
        myStates: {
            meat: true,
            ham: false,
            lamb: false,
            poultry: false,
            fish: false,
            shellfish: false,
            vegetarian: false,
            cheese: false,
            pasta: false,
            sandwich: false,
            dessert: false,
            special: false,
            info: false,
            dollar_1: false,
            dollar_2: true,
            dollar_3: false,
            restaurant: false,
        },
        menuItemDialogOpen: false,
        signInRegDialogType: 'false',
        restaurantDialogOpen: false,
        menuItems: [],
        restaurants: [],
        associatesRestaurants: [],
        associate: {},
        menuItemDialogData: {
            title: "",
            description: "",
            categoryJSON: [],
            price: 0,
            id: "",
            restaurant: "",
            dialogType: "",
        },
        restaurantDialogData: {
            name: "",
            description: "",
            street: "",
            city: "",
            stateUS: "",
            zipCode: "",
            phoneNumber: "",
            urlLink: "",
            id: "",
            menuItemIdsJSON: [],
            associateIdsJSON: [],
            dialogType: "Edit",
            approved: false,
        },
        associateDialogData: {
            id: "",
            canWrite: false,
            canAdmin: false,
            firstName: "",
            lastName: "",
            email: "",
            restaurantIdsJSON: [],
        }
    };

    const [state, dispatch] = useReducer(DataAndMethodsReducer, initialState);
    const alertDialogContext = useContext(AlertDialogContext);
    const deleteConfirmDialogContext = useContext(DeleteConfirmDialogContext);

    //set food choices
    const setMyState = async key => {
        let myNewFoodChoices = JSON.parse(JSON.stringify(state.myStates))
        myNewFoodChoices[key] ? myNewFoodChoices[key] = false : myNewFoodChoices[key] = true;
        setMyStates(myNewFoodChoices);
    };

    // menu item calls ----------------------------------------------------------------

    const setMenuItemDialogDataItem = async (key, value) => {
        let myEditMenuItem = JSON.parse(JSON.stringify(state.menuItemDialogData))
        myEditMenuItem[key] = value;
        setMenuItemDialogData(myEditMenuItem);
    }

    const setMenuItemDialogDataCategory = async (key) => {
        let myNewCategories = JSON.parse(JSON.stringify(state.menuItemDialogData.categoryJSON))
        let myIndex = myNewCategories.indexOf(key, 0)
        if (myIndex !== -1) {
            myNewCategories.splice(myIndex, 1)
        } else {
            myNewCategories.push(key)
        }
        setMenuItemDialogDataItem('categoryJSON', myNewCategories)
    }

    const handleClickMenuItemEdit = (menuId) => {
        for (let i = 0; 1 < state.menuItems.length; i++) {
            if (menuId === state.menuItems[i].id) {
                let myEditItem = {
                    title: state.menuItems[i].title,
                    description: state.menuItems[i].description,
                    categoryJSON: state.menuItems[i].categoryJSON,
                    price: state.menuItems[i].price,
                    id: state.menuItems[i].id,
                    restaurant: state.menuItems[i].restaurant,
                    dialogType: "Edit",
                }
                setMenuItemDialogData(myEditItem);
                setMenuItemDialogOpen(true);
                break;
            }
        }
    };

    const handleClickMenuItemCopy = (menuId) => {
        for (let i = 0; 1 < state.menuItems.length; i++) {
            if (menuId === state.menuItems[i].id) {
                let myEditItem = {
                    title: state.menuItems[i].title,
                    description: state.menuItems[i].description,
                    categoryJSON: state.menuItems[i].categoryJSON,
                    price: state.menuItems[i].price,
                    id: state.menuItems[i].id,
                    restaurant: state.menuItems[i].restaurant,
                    dialogType: "Add",
                }
                setMenuItemDialogData(myEditItem);
                setMenuItemDialogOpen(true);
                break;
            }
        }
    };

    const handleClickMenuItemDelete = (menuId) => {
        for (let i = 0; 1 < state.menuItems.length; i++) {
            if (menuId === state.menuItems[i].id) {
                deleteConfirmDialogContext.setDialog(true, state.menuItems[i].title, 'Delete warning', menuId, deleteMenuItem);
                break;
            }
        }
    };

    const deleteMenuItem = (RestaurantId) => {
        for (let i = 0; 1 < state.menuItems.length; i++) {
            if (RestaurantId === state.menuItems[i].id) {
                //deleteItemDynamoDB(state.menuItemsTableName, state.menuItems[i]);
                break;
            }
        }
    };

    const saveMenuItem = () => {
        let myNewMenuItems = JSON.parse(JSON.stringify(state.menuItems))
        for (let i = 0; i < myNewMenuItems.length; i++) {
            if (state.menuItemDialogData.id === myNewMenuItems[i].id) {
                myNewMenuItems[i].id = state.menuItemDialogData.id;
                myNewMenuItems[i].title = state.menuItemDialogData.title;
                myNewMenuItems[i].description = state.menuItemDialogData.description;
                myNewMenuItems[i].categoryJSON = state.menuItemDialogData.categoryJSON;
                myNewMenuItems[i].price = state.menuItemDialogData.price;
                myNewMenuItems[i].restaurant = state.menuItemDialogData.restaurant;
                //putItemDynamoDB(state.menuItemsTableName, myNewMenuItems[i]);
                break;
            }
        }
    };

    const saveMenuItemCopy = () => {
        let myNewMenuItems = JSON.parse(JSON.stringify(state.menuItems))
        for (let i = 0; i < myNewMenuItems.length; i++) {
            if (state.menuItemDialogData.id === myNewMenuItems[i].id) {
                myNewMenuItems[i].id = uuidv4(); // create uuidv4 as the id
                myNewMenuItems[i].title = state.menuItemDialogData.title;
                myNewMenuItems[i].description = state.menuItemDialogData.description;
                myNewMenuItems[i].categoryJSON = state.menuItemDialogData.categoryJSON;
                myNewMenuItems[i].price = state.menuItemDialogData.price;
                myNewMenuItems[i].restaurant = state.menuItemDialogData.restaurant;
                //putItemDynamoDB(state.menuItemsTableName, myNewMenuItems[i]);
                break;
            }
        }
    };

    // Restaurant calls ----------------------------------------------------------------------

    const setRestaurantDialogDataItem = async (key, value) => {
        let myEditRestaurant = JSON.parse(JSON.stringify(state.restaurantDialogData))
        myEditRestaurant[key] = value;
        setRestaurantDialogData(myEditRestaurant);
    }

    const handleClickRestaurantEdit = (restaurantId) => {
        for (let i = 0; 1 < state.restaurants.length; i++) {
            if (restaurantId === state.restaurants[i].id) {
                let myEditItem = {
                    name: state.restaurants[i].name,
                    description: state.restaurants[i].description,
                    street: state.restaurants[i].street,
                    city: state.restaurants[i].city,
                    stateUS: state.restaurants[i].stateUS,
                    zipCode: state.restaurants[i].zipCode,
                    phoneNumber: state.restaurants[i].phoneNumber,
                    urlLink: state.restaurants[i].urlLink,
                    id: state.restaurants[i].id,
                    menuItemIdsJSON: state.restaurants[i].menuItemIdsJSON,
                    associateIdsJSON: state.restaurants[i].associateIdsJSON,
                    dialogType: "Edit",
                }
                setRestaurantDialogData(myEditItem);
                setRestaurantDialogOpen(true);
                break;
            }
        }
    };

    const handleClickRestaurantCopy = (restaurantId) => {
        for (let i = 0; 1 < state.restaurants.length; i++) {
            if (restaurantId === state.restaurants[i].id) {
                let myEditItem = {
                    name: state.restaurants[i].name,
                    description: state.restaurants[i].description,
                    street: state.restaurants[i].street,
                    city: state.restaurants[i].city,
                    stateUS: state.restaurants[i].stateUS,
                    zipCode: state.restaurants[i].zipCode,
                    phoneNumber: state.restaurants[i].phoneNumber,
                    urlLink: state.restaurants[i].urlLink,
                    id: state.restaurants[i].id,
                    menuItemIdsJSON: state.restaurants[i].menuItemIdsJSON,
                    associateIdsJSON: state.restaurants[i].associateIdsJSON,
                    dialogType: "Add",
                }
                setRestaurantDialogData(myEditItem);
                setRestaurantDialogOpen(true);
                break;
            }
        }
    };

    const handleClickRestaurantDelete = (restaurantId) => {
        for (let i = 0; 1 < state.restaurants.length; i++) {
            if (restaurantId === state.restaurants[i].id) {
                deleteConfirmDialogContext.setDialog(true, state.restaurants[i].name, 'Delete warning', restaurantId, deleteRestaurant);
                break;
            }
        }
    };

    const saveRestaurant = () => {
        let myNewRestaurants = JSON.parse(JSON.stringify(state.restaurants))
        for (let i = 0; i < myNewRestaurants.length; i++) {
            if (state.restaurantDialogData.id === myNewRestaurants[i].id) {
                myNewRestaurants[i].id = state.restaurantDialogData.id;
                myNewRestaurants[i].name = state.restaurantDialogData.name;
                myNewRestaurants[i].description = state.restaurantDialogData.description;
                myNewRestaurants[i].street = state.restaurantDialogData.street;
                myNewRestaurants[i].city = state.restaurantDialogData.city;
                myNewRestaurants[i].stateUS = state.restaurantDialogData.stateUS;
                myNewRestaurants[i].zipCode = state.restaurantDialogData.zipCode;
                myNewRestaurants[i].phoneNumber = state.restaurantDialogData.phoneNumber;
                myNewRestaurants[i].urlLink = state.restaurantDialogData.urlLink;
                myNewRestaurants[i].menuItemIdsJSON = state.restaurantDialogData.menuItemIdsJSON
                myNewRestaurants[i].associateIdsJSON = state.restaurantDialogData.associateIdsJSON
                myNewRestaurants[i].approved = state.restaurantDialogData.approved
                //putItemDynamoDB(state.restaurantsTableName, myNewRestaurants[i]);
                //getAssociatesResturants(myNewRestaurants, state.customId)
                break;
            }
        }
    };

    const saveRestaurantCopy = () => {
        let myNewRestaurants = JSON.parse(JSON.stringify(state.restaurants))
        let myNewRestaurant = {};
        for (let i = 0; i < myNewRestaurants.length; i++) {
            if (state.restaurantDialogData.id === myNewRestaurants[i].id) {
                myNewRestaurant.id = uuidv4(); // create uuidv4 as the id
                myNewRestaurant.name = state.restaurantDialogData.name;
                myNewRestaurant.description = state.restaurantDialogData.description;
                myNewRestaurant.street = state.restaurantDialogData.street;
                myNewRestaurant.city = state.restaurantDialogData.city;
                myNewRestaurant.stateUS = state.restaurantDialogData.stateUS;
                myNewRestaurant.zipCode = state.restaurantDialogData.zipCode;
                myNewRestaurant.phoneNumber = state.restaurantDialogData.phoneNumber;
                myNewRestaurant.urlLink = state.restaurantDialogData.urlLink;
                myNewRestaurant.menuItemIdsJSON = state.restaurantDialogData.menuItemIdsJSON
                myNewRestaurant.associateIdsJSON = state.restaurantDialogData.associateIdsJSON
                myNewRestaurant.approved = state.restaurantDialogData.approved
                myNewRestaurants.push(myNewRestaurant);
                //putItemDynamoDB(state.restaurantsTableName, myNewRestaurant);
                //getAssociatesResturants(myNewRestaurants, state.customId)
                break;
            }
        }
    };

    const deleteRestaurant = (RestaurantId) => {
        let myNewRestaurants = JSON.parse(JSON.stringify(state.restaurants))
        for (let i = 0; 1 < myNewRestaurants.length; i++) {
            if (RestaurantId === myNewRestaurants[i].id) {
                //deleteItemDynamoDB(state.restaurantsTableName, myNewRestaurants[i]);
                myNewRestaurants.splice(i, 1);
                break;
            }
        }
    };


    // dispatch changes to the reducer ---------------------------------------------------------------------
    const setMenuItems = async (menuItems) => { dispatch({ type: SET_MENU_ITEMS, payload: menuItems }) }
    const setRestaurants = async (restaurants) => { dispatch({ type: SET_RESTAURANTS, payload: restaurants }) }
    const setMyStates = async (myStates) => { dispatch({ type: SET_MY_STATES, payload: myStates }) }
    const setMenuItemDialogData = async (myEditMenuItem) => { dispatch({ type: SET_MENU_ITEM_DIALOG_DATA, payload: myEditMenuItem }) }
    const setMenuItemDialogOpen = async (isOpen) => { dispatch({ type: SET_MENU_ITEM_DIALOG_OPEN, payload: isOpen }) }
    const setRestaurantDialogData = async (myRestaurant) => { dispatch({ type: SET_EDIT_RESTAURANTS, payload: myRestaurant }) }
    const setRestaurantDialogOpen = async (isOpen) => { dispatch({ type: SET_EDIT_RESTAURANTS_OPEN, payload: isOpen }) }
    const setSignInRegDialogType = async (type) => { dispatch({ type: SET_SIGN_IN_REG_DIALOG_TYPE, payload: type }) }
    const setSignInRegDialogTitle = async (title) => { dispatch({ type: SET_SIGN_IN_REG_DIALOG_TITLE, payload: title }) }
    const setAuthToken = async (authToken) => { dispatch({ type: SET_AUTH_TOKEN, payload: authToken }) }
    const setIdToken = async (idToken) => { dispatch({ type: SET_ID_TOKEN, payload: idToken }) }
    const setCustomId = async (customId) => { dispatch({ type: SET_CUSTOM_ID, payload: customId }) }
    const setLogInType = async (logInType) => { dispatch({ type: SET_LOGIN_TYPE, payload: logInType }) }
    const setAssociatesRestaurants = async (associatesRestaurants) => { dispatch({ type: SET_ASSOCIATE_RESTAURANTS, payload: associatesRestaurants }) }
    const setAssociate = async (associate) => { dispatch({ type: SET_ASSOCIATE, payload: associate }) }

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
                canEdit: state.canEdit,
                logInType: state.logInType,
                customId: state.customId,
                associatesRestaurants: state.associatesRestaurants,
                associate: state.associate,
                setMyState,
                setMyStates,
                setRestaurants,
                setMenuItemDialogDataItem,
                setMenuItemDialogDataCategory,
                setMenuItemDialogOpen,
                setRestaurantDialogOpen,
                handleClickMenuItemEdit,
                saveMenuItem,
                handleClickMenuItemCopy,
                saveMenuItemCopy,
                handleClickMenuItemDelete,
                handleClickRestaurantEdit,
                handleClickRestaurantCopy,
                handleClickRestaurantDelete,
                saveRestaurant,
                saveRestaurantCopy,
                setRestaurantDialogDataItem,
                setSignInRegDialogType,
                setSignInRegDialogTitle,
                setAuthToken,
                setIdToken,
                setCustomId,
                setLogInType,
                setAssociate,
                setMenuItems,
                setAssociatesRestaurants,
            }}
        >
            {props.children}
        </DataAndMethodsContext.Provider>
    );
};

export default DataAndMethodsState;