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
}));

const BottomNavBar = () => {
    const classes = useStyles();
    return (
        <div className={classes.stickToBottom} color="primary">
            <BottomNavigation className={classes.palette} position="fixed" backgrouncColor={"primary"}>
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
