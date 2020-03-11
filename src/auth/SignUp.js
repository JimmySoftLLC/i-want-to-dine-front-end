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
    const myDefaultTitle = 'Register your restaurant'

    const [title, setTitle] = useState(myDefaultTitle);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [message, setMessage] = useState('');
    const [dialogState, setDialogState] = useState(true);

    const dataAndMethodsContext = useContext(DataAndMethodsContext);

    const handleClose = () => {
        setDialogBackToDefaults();
        dataAndMethodsContext.setSignUpDialogOpen(false);
    };

    const setDialogBackToDefaults = () => {
        setTitle(myDefaultTitle);
        setEmail('');
        setPassword('');
        setPassword2('');
        setMessage('');
        setDialogState(true);
    }

    const handleRegister = async () => {
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
                setDialogState(false);
                console.log(data);
                setTitle('Account created');
                setMessage('Your username is ' + data.user.username + ". You need to verify your account before using it.  An email has been sent to " + data.user.username + " which contains a verification link.")
            } catch (err) {
                console.log(err)
                setMessage(err.message)
            }
        } else {
            setMessage(`Passwords don't match, try again`)
        }
    };

    const checkPasswordsMatch = () => {
        if (password === "") { return false };
        if (password === password2) {
            return true;
        } else {
            return false;
        }
    }

    const changeEmail = (e) => {
        setEmail(e.target.value);
    };

    const changePassword = (e) => {
        setPassword(e.target.value);
    };

    const changePassword2 = (e) => {
        setPassword2(e.target.value);
    };

    return (
        <div>
            <Dialog className={classes.root} open={dataAndMethodsContext.signUpDialogOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">
                    {title}</DialogTitle>
                <DialogContent>
                    {dialogState && <TextField
                        id="email"
                        label="Email"
                        type="email"
                        fullWidth
                        variant="filled"
                        size="small"
                        value={email}
                        onChange={changeEmail}
                    />}
                    {dialogState && <TextField
                        id="password"
                        label="Password"
                        type="password"
                        fullWidth
                        variant="filled"
                        value={password}
                        onChange={changePassword}
                    />}
                    {dialogState && <TextField
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
                {dialogState && <DialogActions>
                    <Button onClick={() => handleClose()} color="default">
                        Cancel
                    </Button>
                    <Button onClick={() => handleRegister()} color="primary">
                        Register
                    </Button>
                </DialogActions>}
                {!dialogState && <DialogActions>
                    <Button onClick={() => handleClose()} color="primary">
                        OK
                    </Button>
                </DialogActions>}
            </Dialog>
        </div>
    );
}

export default SignUp;