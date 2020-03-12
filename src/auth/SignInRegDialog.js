
import { Auth } from 'aws-amplify';
import React, { useContext, useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DataAndMethodsContext from '../context/dataAndMethods/dataAndMethodsContext';

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
    const [resetCode, setResetCode] = useState('');
    const [message, setMessage] = useState('');

    const dataAndMethodsContext = useContext(DataAndMethodsContext);

    const { signInRegDialogType,
        signInRegDialogTitle,
        setSignInRegDialogType,
        setSignInRegDialogTitle } = dataAndMethodsContext;

    const closeDialog = () => {
        dataAndMethodsContext.setSignInRegDialogType('false');
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
        setSignInRegDialogTitle('Register your restuarant');
        setSignInRegDialogType('register')
    }

    const setUpForgotPasswordDialog = () => {
        setSignInRegDialogTitle('Enter your email');
        setSignInRegDialogType('forgotPassword')
    }

    const signIn = () => {
        dataAndMethodsContext.setSignInRegDialogType('false');
        setDialogBackToDefaults();
    }

    const checkPasswordsMatch = () => {
        if (password === "") { return false };
        if (password === password2) {
            return true;
        } else {
            return false;
        }
    }

    const sendResetCode = () => {
        setSignInRegDialogType('codeSent')
        setSignInRegDialogTitle('Code sent');
        setMessage('A code was sent to ' + email + ". Enter the code above with your new password.")
    }

    const resetPassword = (e) => {
        dataAndMethodsContext.setSignInRegDialogType('false');
        setDialogBackToDefaults();
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
                        id="resetCode"
                        label="Reset Code"
                        type="number"
                        fullWidth
                        variant="filled"
                        size="small"
                        value={resetCode}
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
                        Send Reset Code
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