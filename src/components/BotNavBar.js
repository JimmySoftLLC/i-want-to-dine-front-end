import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import BottomNavigation from '@material-ui/core/BottomNavigation';

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
    return (
        <div className={classes.stickToBottom} color="primary">
            <BottomNavigation classes={{ root: classes.root }} position="fixed" color="primary">
                <Toolbar color="primary">
                    <div >
                        <IconButton aria-label=""
                            href="https://jimmysoftllc.com"
                            color={"primary"}>
                            <i className="fas fa-external-link-alt"></i>
                        </IconButton>
                    </div>
                </Toolbar>
            </BottomNavigation>
        </div>
    );
}

export default BottomNavBar;
