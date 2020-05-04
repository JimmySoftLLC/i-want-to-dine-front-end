import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import DataAndMethodsContext from '../context/dataAndMethods/dataAndMethodsContext';
import DefaultBotToolBar from '../components/toolBars/DefaultBotToolBar'
import SignedInBotToolBar from '../components/toolBars/SignedInBotToolBar'

const useStyles = makeStyles(theme => ({
    grow: {
        flexGrow: 1,
    },
    stickToBottom: {
        width: '100%',
        position: 'fixed',
        bottom: 0,
        color: '#000',
    },
    root: {
        background: '#FFCCBC',
    },
    palette: {
        primary: {
            light: '#FFCCBC',
            main: '#FF5722',
            dark: '#E64A19',
            contrastText: '#fff',
        },
        secondary: {
            light: '#637bfe',
            main: '#3d5afe',
            dark: '#2a3eb1',
            contrastText: '#fff',
        },
    },
}));

const BottomNavBar = () => {
    const classes = useStyles();
    const dataAndMethodsContext = useContext(DataAndMethodsContext);

    const { logInType } = dataAndMethodsContext;

    return (
        <div className={classes.stickToBottom} color="primary">
            <BottomNavigation classes={{ root: classes.root }} showLabel="false" position="fixed" color="primary">
                {logInType === 'default' && <DefaultBotToolBar></DefaultBotToolBar>}
                {logInType === 'signedIn' && <SignedInBotToolBar></SignedInBotToolBar>}
            </BottomNavigation>
        </div>
    );
}

export default BottomNavBar;


