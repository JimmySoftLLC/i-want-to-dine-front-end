import React, { Fragment, useContext } from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import DataAndMethodsContext from '../../context/dataAndMethods/dataAndMethodsContext';
import { Tooltip } from '@material-ui/core';
import CategoriesMenu from '../dropDownMenu/CategoriesMenu';
import PriceMenu from '../dropDownMenu/PriceMenu';
import DateMenu from '../dropDownMenu/DateMenu';
import {
    websiteName,
} from '../../api/apiConstants';

const DefaultTopToolBar = () => {
    const dataAndMethodsContext = useContext(DataAndMethodsContext);
    const { myStates, setMyState } = dataAndMethodsContext;

    const setUpRegistrationDialog = () => {
        dataAndMethodsContext.setSignInRegDialogTitle('Restaurant Sign In');
        dataAndMethodsContext.setSignInRegDialogType('signIn')
    }

    const goBack = () => {
        setMyState(myStates['lastState'])
    }

    return (
        <Fragment>
            <Toolbar>
                <div >
                    {!myStates.restaurantDetail && <Tooltip title="Refresh">
                        <IconButton aria-label="" color="inherit" style={{ fontSize: '21px' }}
                            href="/"
                        >
                            {websiteName}
                        </IconButton>
                    </Tooltip>}
                    {myStates.restaurantDetail && <Tooltip title="Go Back">
                        <IconButton aria-label="" color="inherit"
                            onClick={() => goBack()}
                        >
                            <i className="fas fa-angle-left"></i>
                        </IconButton>
                    </Tooltip>}
                    <CategoriesMenu />
                    <PriceMenu />
                    <DateMenu />
                    {myStates.menuItems && <Tooltip title="Beef and other">
                        <IconButton aria-label="" color={myStates['meat'] ? "default" : "inherit"}
                            onClick={() => setMyState('meat')}
                        >
                            <i className='icon-tbone'></i>
                        </IconButton>
                    </Tooltip>}
                    {myStates.menuItems && <Tooltip title="Pork">
                        <IconButton aria-label="" color={myStates['pork'] ? "default" : "inherit"}
                            onClick={() => setMyState('pork')}
                        >
                            <i className='icon-ham'></i>
                        </IconButton>
                    </Tooltip>}
                    {myStates.menuItems && <Tooltip title="Poultry">
                        <IconButton aria-label="" color={myStates['poultry'] ? "default" : "inherit"}
                            onClick={() => setMyState('poultry')}
                        >
                            <i className="fas fa-feather"></i>
                        </IconButton>
                    </Tooltip>}
                    {myStates.menuItems && <Tooltip title="Fish">
                        <IconButton aria-label="" color={myStates['fish'] ? "default" : "inherit"}
                            onClick={() => setMyState('fish')}
                        >
                            <i className='fas fa-fish'></i>
                        </IconButton>
                    </Tooltip>}
                    {myStates.menuItems && <Tooltip title="Shellfish">
                        <IconButton aria-label="" color={myStates['shellfish'] ? "default" : "inherit"}
                            onClick={() => setMyState('shellfish')}
                        >
                            <i className='icon-shell'></i>
                        </IconButton>
                    </Tooltip>}
                    {myStates.menuItems && <Tooltip title="Vegetarian">
                        <IconButton aria-label="" color={myStates['vegetarian'] ? "default" : "inherit"}
                            onClick={() => setMyState('vegetarian')}
                        >
                            <i className='fas fa-seedling'></i>
                        </IconButton>
                    </Tooltip>}
                    {myStates.menuItems && <Tooltip title="Cheese">
                        <IconButton aria-label="" color={myStates['cheese'] ? "default" : "inherit"}
                            onClick={() => setMyState('cheese')}
                        >
                            <i className='fas fa-cheese'></i>
                        </IconButton>
                    </Tooltip>}

                    {myStates.menuItems && <Tooltip title="Carryout">
                        <IconButton aria-label="" color={myStates['carryout'] ? "default" : "inherit"}
                            onClick={() => setMyState('carryout')}
                        >
                            <i className="fas fa-shopping-bag"></i>
                        </IconButton>
                    </Tooltip>}

                    {myStates.associates && <Tooltip title="Log in">
                        <IconButton aria-label=""
                            color="inherit"
                            onClick={() => setUpRegistrationDialog()}>
                            <i className="fas fa-sign-in-alt"></i>
                        </IconButton>
                    </Tooltip>}
                </div>
            </Toolbar>
        </Fragment>
    );
}

export default DefaultTopToolBar;