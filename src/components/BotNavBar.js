import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import DataAndMethodsContext from '../context/dataAndMethods/dataAndMethodsContext';

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
    // console.log(dataAndMethodsContext)
    return (
        <div className={classes.stickToBottom} color="primary">
            <BottomNavigation classes={{ root: classes.root }} showLabel="false" position="fixed" color="primary">
                <Toolbar showLabel="false" color="primary">
                    <IconButton aria-label=""
                        href="https://jimmysoftllc.com"
                        color={"primary"}>
                        <i className="fas fa-external-link-alt"></i>
                    </IconButton>
                    <IconButton aria-label=""
                        color={dataAndMethodsContext.myStates['dollar_1'] ? "secondary" : "primary"}
                        onClick={() => dataAndMethodsContext.setFoodChoice('dollar_1')}>
                        <i className="icon-dollar_1"></i>
                    </IconButton>
                    <IconButton aria-label=""
                        color={dataAndMethodsContext.myStates['dollar_2'] ? "secondary" : "primary"}
                        onClick={() => dataAndMethodsContext.setFoodChoice('dollar_2')}>
                        <i className="icon-dollar_2"></i>
                    </IconButton>
                    <IconButton aria-label=""
                        color={dataAndMethodsContext.myStates['dollar_3'] ? "secondary" : "primary"}
                        onClick={() => dataAndMethodsContext.setFoodChoice('dollar_3')}>
                        <i className="icon-dollar_3"></i>
                    </IconButton>
                    <IconButton aria-label=""
                        color={dataAndMethodsContext.myStates['restuarant'] ? "secondary" : "primary"}
                        onClick={() => dataAndMethodsContext.setFoodChoice('restuarant')}>
                        <i className="icon-resturant"></i>
                    </IconButton>
                    <IconButton aria-label=""
                        color="primary">
                        <i className="fas fa-sign-in-alt"></i>
                    </IconButton>
                </Toolbar>
            </BottomNavigation>
        </div>
    );
}

export default BottomNavBar;
