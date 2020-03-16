const updateMenuIdsForRestaurant = async (restaurantItem, menuItems) => {
    let myMenuItemIds = [];
    for (let i = 0; i < menuItems.length; i++) {
        if (restaurantItem.name === menuItems[i].restaurant) {
            myMenuItemIds.push(menuItems[i].id)
        }
    }
    restaurantItem.menuItemIdsJSON = myMenuItemIds;
    putItemDynamoDB(restaurantTableName, restaurantItem)
}

const updateAssociateIdsForRestaurant = async (restaurantItem) => {
    let myAssociateIdsJSON = ['3fb19b1a-e35a-4b72-aa81-03594ab73a69'];
    restaurantItem.associateIdsJSON = myAssociateIdsJSON;
    putItemDynamoDB(restaurantTableName, restaurantItem)
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