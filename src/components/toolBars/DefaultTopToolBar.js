import React, { Fragment, useContext } from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import DataAndMethodsContext from '../../context/dataAndMethods/dataAndMethodsContext';
import { Tooltip } from '@material-ui/core';

const DefaultTopToolBar = () => {
    const dataAndMethodsContext = useContext(DataAndMethodsContext);
    const { myStates } = dataAndMethodsContext;
    return (
        <Fragment>
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
                        <IconButton aria-label="" color={myStates['meat'] ? "default" : "inherit"}
                            onClick={() => dataAndMethodsContext.setFoodChoice('meat')}
                        >
                            <i className='icon-tbone'></i>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Pork">
                        <IconButton aria-label="" color={myStates['pork'] ? "default" : "inherit"}
                            onClick={() => dataAndMethodsContext.setFoodChoice('pork')}
                        >
                            <i className='icon-ham'></i>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Lamb">
                        <IconButton aria-label="" color={myStates['lamb'] ? "default" : "inherit"}
                            onClick={() => dataAndMethodsContext.setFoodChoice('lamb')}
                        >
                            <i className='icon-lamb'></i>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Poultry">
                        <IconButton aria-label="" color={myStates['poultry'] ? "default" : "inherit"}
                            onClick={() => dataAndMethodsContext.setFoodChoice('poultry')}
                        >
                            <i className="fas fa-feather"></i>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Fish">
                        <IconButton aria-label="" color={myStates['fish'] ? "default" : "inherit"}
                            onClick={() => dataAndMethodsContext.setFoodChoice('fish')}
                        >
                            <i className='fas fa-fish'></i>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Shellfish">
                        <IconButton aria-label="" color={myStates['shellfish'] ? "default" : "inherit"}
                            onClick={() => dataAndMethodsContext.setFoodChoice('shellfish')}
                        >
                            <i className='icon-shell'></i>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Vegetarian">
                        <IconButton aria-label="" color={myStates['vegetarian'] ? "default" : "inherit"}
                            onClick={() => dataAndMethodsContext.setFoodChoice('vegetarian')}
                        >
                            <i className='fas fa-seedling'></i>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Cheese">
                        <IconButton aria-label="" color={myStates['cheese'] ? "default" : "inherit"}
                            onClick={() => dataAndMethodsContext.setFoodChoice('cheese')}
                        >
                            <i className='fas fa-cheese'></i>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Pasta">
                        <IconButton aria-label="" color={myStates['pasta'] ? "default" : "inherit"}
                            onClick={() => dataAndMethodsContext.setFoodChoice('pasta')}
                        >
                            <i className='icon-spaghetti'></i>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Sandwiches">
                        <IconButton aria-label="" color={myStates['sandwich'] ? "default" : "inherit"}
                            onClick={() => dataAndMethodsContext.setFoodChoice('sandwich')}
                        >
                            <i className='fas fa-hamburger'></i>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Dessert">
                        <IconButton aria-label="" color={myStates['dessert'] ? "default" : "inherit"}
                            onClick={() => dataAndMethodsContext.setFoodChoice('dessert')}
                        >
                            <i className="fas fa-birthday-cake"></i>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Specials">
                        <IconButton aria-label="" color={myStates['specials'] ? "default" : "inherit"}
                            onClick={() => dataAndMethodsContext.setFoodChoice('specials')}
                        >
                            <i className="fas fa-tag"></i>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Information">
                        <IconButton aria-label="" color={myStates['info'] ? "default" : "inherit"}
                            onClick={() => dataAndMethodsContext.setFoodChoice('info')}
                        >
                            <i className="fas fa-info"></i>
                        </IconButton>
                    </Tooltip>
                </div>
            </Toolbar>
        </Fragment>
    );
}

export default DefaultTopToolBar;