import { Auth } from 'aws-amplify';
import React, { useContext, useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DataAndMethodsContext from '../../context/dataAndMethods/dataAndMethodsContext';
import { v4 as uuidv4 } from 'uuid';
import getAssociate from '../../model/getAssociate';
import getAssociateRestaurants from '../../model/getAssociateRestaurants';
import createNewAssociate from '../../model/createNewAssociate';
import validEmail from '../../model/validEmail';

import {
    // menuItemsTableName,
    // restaurantsTableName,
    // associatesTableName,
    // apiName,
    // apiPath,
    // projectionExpressionRestaurant,
    noSelectedRestaurant,
} from '../../api/apiConstants';

const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            marginLeft: 0,
        },
    },
}));

const SignUp = () => {
    const classes = useStyles();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [verificationCode, setResetCode] = useState('');
    const [message, setMessage] = useState('');

    const dataAndMethodsContext = useContext(DataAndMethodsContext);

    const { signInRegDialogType,
        signInRegDialogTitle,
        setSignInRegDialogType,
        setSignInRegDialogTitle,
        setAuthToken,
        setIdToken,
        setCustomId,
        setLogInType,
        setAssociate,
        setAssociatesRestaurants,
        setRestaurantId,
        setMyState,
    } = dataAndMethodsContext;

    const closeDialog = () => {
        setSignInRegDialogType('false');
        setDialogBackToDefaults();
    };

    const setDialogBackToDefaults = () => {
        setEmail('');
        setPassword('');
        setPassword2('');
        setMessage('');
    }

    const registerUser = async () => {
        if (checkPasswordsMatch()) {
            try {
                const params = {
                    username: email,
                    password: password,
                    attributes: {
                        email: email,
                        'custom:id': uuidv4(),
                    },
                    validationData: []
                };
                const data = await Auth.signUp(params);
                console.log(data);
                setSignInRegDialogType('registered')
                setSignInRegDialogTitle('Account created');
                setMessage('Your username is ' + email + ". You need to verify your account before using it.  An email has been sent to " + data.user.username + " which contains a verification link.")
            } catch (err) {
                console.log(err)
                setMessage(err.message)
            }
        } else {
            setMessage(`Passwords don't match, try again`)
        }
    };

    const setUpRegisterDialog = () => {
        setDialogBackToDefaults()
        setSignInRegDialogTitle('Register your restaurant');
        setSignInRegDialogType('register')
    }

    const setUpForgotPasswordDialog = () => {
        setDialogBackToDefaults()
        setSignInRegDialogTitle('Enter your email');
        setSignInRegDialogType('forgotPassword')
    }

    const signIn = async () => {
        try {
            const userObject = await Auth.signIn(
                email,
                password
            );
            // console.log('userObject', userObject);
            if (userObject.challengeName) {
                // Auth challenges are pending prior to token issuance
                console.error(userObject);
            } else {
                // No remaining auth challenges need to be satisfied
                const session = await Auth.currentSession();
                setCustomId(session.idToken.payload['custom:id']);
                setAuthToken(session.accessToken.jwtToken);
                setIdToken(session.idToken.jwtToken);
                const associate = await getAssociate(session.idToken.jwtToken, session.idToken.payload['custom:id'], session.idToken.payload['email'])
                if (!associate) {
                    let myNewAssociate = await createNewAssociate(session.idToken.jwtToken, session.idToken.payload['custom:id'], session.idToken.payload['email'])
                    if (myNewAssociate) {
                        const associatesRestaurants = await getAssociateRestaurants(myNewAssociate)
                        //console.log(associatesRestaurants);
                        setAssociatesRestaurants(associatesRestaurants);
                        setAssociate(myNewAssociate);
                        setLogInType('signedIn')
                        setSignInRegDialogType('false');
                        setDialogBackToDefaults();
                        setRestaurantId(noSelectedRestaurant);
                        setMyState('restaurantSettings');
                    }
                } else {
                    //console.log(associate);
                    setAssociate(associate);
                    const associatesRestaurants = await getAssociateRestaurants(associate)
                    //console.log(associatesRestaurants);
                    setAssociatesRestaurants(associatesRestaurants);
                    setLogInType('signedIn')
                    setSignInRegDialogType('false');
                    setDialogBackToDefaults();
                    setRestaurantId(noSelectedRestaurant);
                    setMyState('restaurantSettings');
                }
            }
        } catch (err) {
            console.error(err)
            setMessage(err.message)
        }
    }

    const checkPasswordsMatch = () => {
        if (password === "") { return false };
        if (password === password2) {
            return true;
        } else {
            return false;
        }
    }

    const sendResetCode = async () => {
        if (validEmail(email)) {
            try {
                const data = await Auth.forgotPassword(email)
                console.log(data);
                setSignInRegDialogType('codeSent')
                setSignInRegDialogTitle('Code sent');
                setMessage('A verification code was sent to ' + email + ". Enter the code above with your new password.")
            } catch (err) {
                console.log(err)
                setMessage(err.message)
            }
        } else {
            setMessage('Invalid email entered, try again.')
        }
    }

    const resetPassword = async (e) => {
        if (checkPasswordsMatch()) {
            if (validEmail(email)) {
                try {
                    const data = await Auth.forgotPasswordSubmit(email, verificationCode, password)
                    console.log(data);
                    dataAndMethodsContext.setSignInRegDialogType('false');
                    setDialogBackToDefaults();
                } catch (err) {
                    console.log(err)
                    setMessage(err.message)
                }
            } else {
                setMessage('Invalid email entered, try again.')
            }
        } else {
            setMessage(`Passwords don't match, try again`)
        }
    };

    const changeEmail = (e) => {
        setEmail(e.target.value);
    };

    const changePassword = (e) => {
        setPassword(e.target.value);
    };

    const changePassword2 = (e) => {
        setPassword2(e.target.value);
    };

    const changeResetCode = (e) => {
        setResetCode(e.target.value);
    };

    let showEmail = false;
    signInRegDialogType === 'signIn' || signInRegDialogType === 'register' || signInRegDialogType === 'forgotPassword' ? showEmail = true : showEmail = false

    let showPassword = false;
    signInRegDialogType === 'signIn' || signInRegDialogType === 'register' || signInRegDialogType === 'codeSent' ? showPassword = true : showPassword = false

    let showPassword2 = false;
    signInRegDialogType === 'register' || signInRegDialogType === 'codeSent' ? showPassword2 = true : showPassword2 = false

    let showResetCode = false;
    signInRegDialogType === 'codeSent' ? showResetCode = true : showResetCode = false

    return (
        <div>
            {signInRegDialogType !== 'false' && <Dialog className={classes.root} open={true} onClose={closeDialog} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">
                    {signInRegDialogTitle}</DialogTitle>
                <DialogContent>
                    {showEmail && <TextField
                        id="email"
                        label="Email"
                        type="email"
                        fullWidth
                        variant="filled"
                        size="small"
                        value={email}
                        onChange={changeEmail}
                    />}
                    {showResetCode && <TextField
                        id="verificationCode"
                        label="Verification Code"
                        type="number"
                        fullWidth
                        variant="filled"
                        size="small"
                        value={verificationCode}
                        onChange={changeResetCode}
                    />}
                    {showPassword && <TextField
                        id="password"
                        label="Password"
                        type="password"
                        fullWidth
                        variant="filled"
                        value={password}
                        onChange={changePassword}
                    />}
                    {showPassword2 && <TextField
                        id="password2"
                        label="Retype Password"
                        type="password"
                        fullWidth
                        variant="filled"
                        value={password2}
                        onChange={changePassword2}
                    />}
                    <p>{message}</p>
                </DialogContent>
                {signInRegDialogType === 'signIn' && <DialogActions>
                    <Button onClick={() => setUpForgotPasswordDialog()} color="default">
                        Forgot Password
                    </Button>
                </DialogActions>}
                {signInRegDialogType === 'signIn' && <DialogActions>
                    <Button onClick={() => setUpRegisterDialog()} color="default">
                        Register
                    </Button>
                    <Button onClick={() => closeDialog()} color="default">
                        Cancel
                    </Button>
                    <Button onClick={() => signIn()} color="primary">
                        Sign In
                    </Button>
                </DialogActions>}
                {signInRegDialogType === 'register' && <DialogActions>
                    <Button onClick={() => closeDialog()} color="default">
                        Cancel
                    </Button>
                    <Button onClick={() => registerUser()} color="primary">
                        Register
                    </Button>
                </DialogActions>}
                {signInRegDialogType === 'registered' && <DialogActions>
                    <Button onClick={() => closeDialog()} color="primary">
                        OK
                    </Button>
                </DialogActions>}
                {signInRegDialogType === 'forgotPassword' && <DialogActions>
                    <Button onClick={() => closeDialog()} color="default">
                        Cancel
                    </Button>
                    <Button onClick={() => sendResetCode()} color="primary">
                        Send Verification Code
                    </Button>
                </DialogActions>}
                {signInRegDialogType === 'codeSent' && <DialogActions>
                    <Button onClick={() => closeDialog()} color="default">
                        Cancel
                    </Button>
                    <Button onClick={() => resetPassword()} color="primary">
                        Reset Password
                    </Button>
                </DialogActions>}
            </Dialog>}
        </div>
    );
}

export default SignUp;