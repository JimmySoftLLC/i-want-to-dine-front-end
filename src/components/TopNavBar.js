import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import DataAndMethodsContext from '../context/dataAndMethods/dataAndMethodsContext';

const useStyles = makeStyles(theme => ({
    grow: {
        flexGrow: 1,
    },
}));

const TopNavBar = () => {
    const classes = useStyles();
    const dataAndMethodsContext = useContext(DataAndMethodsContext);
    return (
        <div className={classes.grow}>
            <AppBar position="fixed" color="primary">
                <Toolbar>
                    <div >
                        <IconButton aria-label="" color="inherit"
                            href="/"
                        >
                            iWantToDine
                        </IconButton>
                        <IconButton aria-label="" color={dataAndMethodsContext.myStates['steak'] ? "default" : "inherit"}
                            onClick={() => dataAndMethodsContext.setFoodChoice('steak')}
                        >
                            <i className='icon-steak'></i>
                        </IconButton>
                        <IconButton aria-label="" color={dataAndMethodsContext.myStates['pork'] ? "default" : "inherit"}
                            onClick={() => dataAndMethodsContext.setFoodChoice('pork')}
                        >
                            <i className='icon-pork'></i>
                        </IconButton>
                        <IconButton aria-label="" color={dataAndMethodsContext.myStates['pork1'] ? "default" : "inherit"}
                            onClick={() => dataAndMethodsContext.setFoodChoice('pork1')}
                        >
                            <i className='icon-pork1'></i>
                        </IconButton>
                        <IconButton aria-label="" color={dataAndMethodsContext.myStates['drumstick'] ? "default" : "inherit"}
                            onClick={() => dataAndMethodsContext.setFoodChoice('drumstick')}
                        >
                            <i className='icon-drumstick-bite-solid'></i>
                        </IconButton>
                        <IconButton aria-label="" color={dataAndMethodsContext.myStates['hamburger'] ? "default" : "inherit"}
                            onClick={() => dataAndMethodsContext.setFoodChoice('hamburger')}
                        >
                            <i className='icon-hamburger-solid'></i>
                        </IconButton>
                        <IconButton aria-label="" color={dataAndMethodsContext.myStates['fish'] ? "default" : "inherit"}
                            onClick={() => dataAndMethodsContext.setFoodChoice('fish')}
                        >
                            <i className='icon-fish-solid'></i>
                        </IconButton>
                        <IconButton aria-label="" color={dataAndMethodsContext.myStates['shell'] ? "default" : "inherit"}
                            onClick={() => dataAndMethodsContext.setFoodChoice('shell')}
                        >
                            <i className='icon-shell'></i>
                        </IconButton>
                        <IconButton aria-label="" color={dataAndMethodsContext.myStates['seedling'] ? "default" : "inherit"}
                            onClick={() => dataAndMethodsContext.setFoodChoice('seedling')}
                        >
                            <i className='icon-seedling-solid'></i>
                        </IconButton>
                        <IconButton aria-label="" color={dataAndMethodsContext.myStates['info'] ? "default" : "inherit"}
                            onClick={() => dataAndMethodsContext.setFoodChoice('info')}
                        >
                            <i className="fas fa-info"></i>
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default TopNavBar;
