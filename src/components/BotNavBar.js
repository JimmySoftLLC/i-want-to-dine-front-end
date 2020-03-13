import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import DataAndMethodsContext from '../context/dataAndMethods/dataAndMethodsContext';
import { Tooltip } from '@material-ui/core';

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

    const setUpRegistrationDialog = () => {

        dataAndMethodsContext.setSignInRegDialogTitle('Restaurant Sign In');
        dataAndMethodsContext.setSignInRegDialogType('signIn')
    }

    // console.log(dataAndMethodsContext)
    return (
        <div className={classes.stickToBottom} color="primary">
            <BottomNavigation classes={{ root: classes.root }} showLabel="false" position="fixed" color="primary">
                <Toolbar showLabel="false" color="primary">
                    <Tooltip title="0-20 dollars">
                        <IconButton aria-label=""
                            color={dataAndMethodsContext.myStates['dollar_1'] ? "secondary" : "primary"}
                            onClick={() => dataAndMethodsContext.setFoodChoice('dollar_1')}>
                            <i className="icon-dollar_1"></i>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="20-35 dollars">
                        <IconButton aria-label=""
                            color={dataAndMethodsContext.myStates['dollar_2'] ? "secondary" : "primary"}
                            onClick={() => dataAndMethodsContext.setFoodChoice('dollar_2')}>
                            <i className="icon-dollar_2"></i>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="35 and up dollars">
                        <IconButton aria-label=""
                            color={dataAndMethodsContext.myStates['dollar_3'] ? "secondary" : "primary"}
                            onClick={() => dataAndMethodsContext.setFoodChoice('dollar_3')}>
                            <i className="icon-dollar_3"></i>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Restaurants">
                        <IconButton aria-label=""
                            color={dataAndMethodsContext.myStates['restaurant'] ? "secondary" : "primary"}
                            onClick={() => dataAndMethodsContext.setFoodChoice('restaurant')}>
                            <i className="icon-Restaurant"></i>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Log in">
                        <IconButton aria-label=""
                            color="primary"
                            onClick={() => setUpRegistrationDialog()}>
                            <i className="fas fa-sign-in-alt"></i>
                        </IconButton>
                    </Tooltip>
                    {/* <IconButton aria-label=""
                        color="primary">
                        <i className="icon-fav-Restaurant"></i>
                    </IconButton> */}
                </Toolbar>
            </BottomNavigation>
        </div>
    );
}

export default BottomNavBar;
