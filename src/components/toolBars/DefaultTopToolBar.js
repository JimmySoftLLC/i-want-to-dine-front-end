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
                    {myStates.menuItems && <Tooltip title="Beef and other">
                        <IconButton aria-label="" color={myStates['meat'] ? "default" : "inherit"}
                            onClick={() => dataAndMethodsContext.setMyState('meat')}
                        >
                            <i className='icon-tbone'></i>
                        </IconButton>
                    </Tooltip>}
                    {myStates.menuItems && <Tooltip title="Pork">
                        <IconButton aria-label="" color={myStates['pork'] ? "default" : "inherit"}
                            onClick={() => dataAndMethodsContext.setMyState('pork')}
                        >
                            <i className='icon-ham'></i>
                        </IconButton>
                    </Tooltip>}
                    {myStates.menuItems && <Tooltip title="Poultry">
                        <IconButton aria-label="" color={myStates['poultry'] ? "default" : "inherit"}
                            onClick={() => dataAndMethodsContext.setMyState('poultry')}
                        >
                            <i className="fas fa-feather"></i>
                        </IconButton>
                    </Tooltip>}
                    {myStates.menuItems && <Tooltip title="Fish">
                        <IconButton aria-label="" color={myStates['fish'] ? "default" : "inherit"}
                            onClick={() => dataAndMethodsContext.setMyState('fish')}
                        >
                            <i className='fas fa-fish'></i>
                        </IconButton>
                    </Tooltip>}
                    {myStates.menuItems && <Tooltip title="Shellfish">
                        <IconButton aria-label="" color={myStates['shellfish'] ? "default" : "inherit"}
                            onClick={() => dataAndMethodsContext.setMyState('shellfish')}
                        >
                            <i className='icon-shell'></i>
                        </IconButton>
                    </Tooltip>}
                    {myStates.menuItems && <Tooltip title="Vegetarian">
                        <IconButton aria-label="" color={myStates['vegetarian'] ? "default" : "inherit"}
                            onClick={() => dataAndMethodsContext.setMyState('vegetarian')}
                        >
                            <i className='fas fa-seedling'></i>
                        </IconButton>
                    </Tooltip>}
                    {myStates.menuItems && <Tooltip title="Cheese">
                        <IconButton aria-label="" color={myStates['cheese'] ? "default" : "inherit"}
                            onClick={() => dataAndMethodsContext.setMyState('cheese')}
                        >
                            <i className='fas fa-cheese'></i>
                        </IconButton>
                    </Tooltip>}
                    {myStates.menuItems && <Tooltip title="Pasta">
                        <IconButton aria-label="" color={myStates['pasta'] ? "default" : "inherit"}
                            onClick={() => dataAndMethodsContext.setMyState('pasta')}
                        >
                            <i className='icon-spaghetti'></i>
                        </IconButton>
                    </Tooltip>}
                    {myStates.menuItems && <Tooltip title="Sandwiches">
                        <IconButton aria-label="" color={myStates['sandwich'] ? "default" : "inherit"}
                            onClick={() => dataAndMethodsContext.setMyState('sandwich')}
                        >
                            <i className='fas fa-hamburger'></i>
                        </IconButton>
                    </Tooltip>}
                    {myStates.menuItems && <Tooltip title="Dessert">
                        <IconButton aria-label="" color={myStates['dessert'] ? "default" : "inherit"}
                            onClick={() => dataAndMethodsContext.setMyState('dessert')}
                        >
                            <i className="fas fa-birthday-cake"></i>
                        </IconButton>
                    </Tooltip>}
                    {myStates.menuItems && <Tooltip title="Daily specials">
                        <IconButton aria-label="" color={myStates['specials'] ? "default" : "inherit"}
                            onClick={() => dataAndMethodsContext.setMyState('specials')}
                        >
                            <i className="fas fa-tag"></i>
                        </IconButton>
                    </Tooltip>}
                    {myStates.menuItems && <Tooltip title="Carryout">
                        <IconButton aria-label="" color={myStates['carryout'] ? "default" : "inherit"}
                            onClick={() => dataAndMethodsContext.setMyState('carryout')}
                        >
                            <i className="fas fa-shopping-bag"></i>
                        </IconButton>
                    </Tooltip>}
                </div>
            </Toolbar>
        </Fragment>
    );
}

export default DefaultTopToolBar;