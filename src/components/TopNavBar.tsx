import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import DataAndMethodsContext from '../context/dataAndMethods/dataAndMethodsContext';
import DefaultTopToolBar from '../components/toolBars/DefaultTopToolBar'
import SignedInTopToolBar from '../components/toolBars/SignedInTopToolBar'

const useStyles = makeStyles(theme => ({
    grow: {
        flexGrow: 1,
    },
}));

const TopNavBar = () => {
    const classes = useStyles();
    const dataAndMethodsContext: any = useContext(DataAndMethodsContext);
    const { logInType } = dataAndMethodsContext;

    return (
        <div className={classes.grow}>
            <AppBar position="fixed" color="primary">
                {logInType === 'default' && <DefaultTopToolBar></DefaultTopToolBar>}
                {logInType === 'signedIn' && <SignedInTopToolBar></SignedInTopToolBar>}
            </AppBar>
        </div>
    );
}

export default TopNavBar;
