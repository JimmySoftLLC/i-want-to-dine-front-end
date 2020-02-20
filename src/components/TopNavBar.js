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
                        <IconButton aria-label="" color={dataAndMethodsContext.myStates['meat'] ? "default" : "inherit"}
                            onClick={() => dataAndMethodsContext.setFoodChoice('meat')}
                        >
                            <i className='icon-steak'></i>
                        </IconButton>
                        <IconButton aria-label="" color={dataAndMethodsContext.myStates['poultry'] ? "default" : "inherit"}
                            onClick={() => dataAndMethodsContext.setFoodChoice('poultry')}
                        >
                            <i className="fas fa-feather"></i>
                        </IconButton>
                        <IconButton aria-label="" color={dataAndMethodsContext.myStates['pasta'] ? "default" : "inherit"}
                            onClick={() => dataAndMethodsContext.setFoodChoice('pasta')}
                        >
                            <i className='icon-pasta'></i>
                        </IconButton>
                        <IconButton aria-label="" color={dataAndMethodsContext.myStates['sandwich'] ? "default" : "inherit"}
                            onClick={() => dataAndMethodsContext.setFoodChoice('sandwich')}
                        >
                            <i className='fas fa-hamburger'></i>
                        </IconButton>
                        <IconButton aria-label="" color={dataAndMethodsContext.myStates['fish'] ? "default" : "inherit"}
                            onClick={() => dataAndMethodsContext.setFoodChoice('fish')}
                        >
                            <i className='fas fa-fish'></i>
                        </IconButton>
                        <IconButton aria-label="" color={dataAndMethodsContext.myStates['shellfish'] ? "default" : "inherit"}
                            onClick={() => dataAndMethodsContext.setFoodChoice('shellfish')}
                        >
                            <i className='icon-shell'></i>
                        </IconButton>
                        <IconButton aria-label="" color={dataAndMethodsContext.myStates['vegetarian'] ? "default" : "inherit"}
                            onClick={() => dataAndMethodsContext.setFoodChoice('vegetarian')}
                        >
                            <i className='fas fa-seedling'></i>
                        </IconButton>
                        <IconButton aria-label="" color={dataAndMethodsContext.myStates['dessert'] ? "default" : "inherit"}
                            onClick={() => dataAndMethodsContext.setFoodChoice('dessert')}
                        >
                            <i className='fas fa-cheese'></i>
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
