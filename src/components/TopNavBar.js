import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import DataAndMethodsContext from '../context/dataAndMethods/dataAndMethodsContext';
import { Tooltip } from '@material-ui/core';

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
                        <Tooltip title="Refresh">
                            <IconButton aria-label="" color="inherit"
                                href="/"
                            >
                                iWantToDine
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Beef and other">
                            <IconButton aria-label="" color={dataAndMethodsContext.myStates['meat'] ? "default" : "inherit"}
                                onClick={() => dataAndMethodsContext.setFoodChoice('meat')}
                            >
                                <i className='icon-tbone'></i>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Pork">
                            <IconButton aria-label="" color={dataAndMethodsContext.myStates['pork'] ? "default" : "inherit"}
                                onClick={() => dataAndMethodsContext.setFoodChoice('pork')}
                            >
                                <i className='icon-ham'></i>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Lamb">
                            <IconButton aria-label="" color={dataAndMethodsContext.myStates['lamb'] ? "default" : "inherit"}
                                onClick={() => dataAndMethodsContext.setFoodChoice('lamb')}
                            >
                                <i className='icon-lamb'></i>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Poultry">
                            <IconButton aria-label="" color={dataAndMethodsContext.myStates['poultry'] ? "default" : "inherit"}
                                onClick={() => dataAndMethodsContext.setFoodChoice('poultry')}
                            >
                                <i className="fas fa-feather"></i>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Fish">
                            <IconButton aria-label="" color={dataAndMethodsContext.myStates['fish'] ? "default" : "inherit"}
                                onClick={() => dataAndMethodsContext.setFoodChoice('fish')}
                            >
                                <i className='fas fa-fish'></i>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Shellfish">
                            <IconButton aria-label="" color={dataAndMethodsContext.myStates['shellfish'] ? "default" : "inherit"}
                                onClick={() => dataAndMethodsContext.setFoodChoice('shellfish')}
                            >
                                <i className='icon-shell'></i>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Vegetarian">
                            <IconButton aria-label="" color={dataAndMethodsContext.myStates['vegetarian'] ? "default" : "inherit"}
                                onClick={() => dataAndMethodsContext.setFoodChoice('vegetarian')}
                            >
                                <i className='fas fa-seedling'></i>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Cheese">
                            <IconButton aria-label="" color={dataAndMethodsContext.myStates['cheese'] ? "default" : "inherit"}
                                onClick={() => dataAndMethodsContext.setFoodChoice('cheese')}
                            >
                                <i className='fas fa-cheese'></i>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Pasta">
                            <IconButton aria-label="" color={dataAndMethodsContext.myStates['pasta'] ? "default" : "inherit"}
                                onClick={() => dataAndMethodsContext.setFoodChoice('pasta')}
                            >
                                <i className='icon-pasta'></i>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Sandwiches">
                            <IconButton aria-label="" color={dataAndMethodsContext.myStates['sandwich'] ? "default" : "inherit"}
                                onClick={() => dataAndMethodsContext.setFoodChoice('sandwich')}
                            >
                                <i className='fas fa-hamburger'></i>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Dessert">
                            <IconButton aria-label="" color={dataAndMethodsContext.myStates['dessert'] ? "default" : "inherit"}
                                onClick={() => dataAndMethodsContext.setFoodChoice('dessert')}
                            >
                                <i className="fas fa-birthday-cake"></i>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Specials">
                            <IconButton aria-label="" color={dataAndMethodsContext.myStates['specials'] ? "default" : "inherit"}
                                onClick={() => dataAndMethodsContext.setFoodChoice('specials')}
                            >
                                <i className="fas fa-tag"></i>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Information">
                            <IconButton aria-label="" color={dataAndMethodsContext.myStates['info'] ? "default" : "inherit"}
                                onClick={() => dataAndMethodsContext.setFoodChoice('info')}
                            >
                                <i className="fas fa-info"></i>
                            </IconButton>
                        </Tooltip>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default TopNavBar;
