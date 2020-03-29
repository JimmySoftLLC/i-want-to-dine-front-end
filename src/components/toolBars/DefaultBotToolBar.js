import React, { Fragment, useContext } from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import DataAndMethodsContext from '../../context/dataAndMethods/dataAndMethodsContext';
import { Tooltip } from '@material-ui/core';

const DefaultBotToolBar = () => {
    const dataAndMethodsContext = useContext(DataAndMethodsContext);
    const { myStates, setMyState } = dataAndMethodsContext;

    const setUpRegistrationDialog = () => {
        dataAndMethodsContext.setSignInRegDialogTitle('Restaurant Sign In');
        dataAndMethodsContext.setSignInRegDialogType('signIn')
    }

    return (
        <Fragment>
            <Toolbar showLabel="false" color="primary">
                <Tooltip title="0-20 dollars">
                    <IconButton aria-label=""
                        color={myStates['dollar_1'] ? "secondary" : "primary"}
                        onClick={() => setMyState('dollar_1')}>
                        <i className="icon-dollar_1"></i>
                    </IconButton>
                </Tooltip>
                <Tooltip title="20-35 dollars">
                    <IconButton aria-label=""
                        color={myStates['dollar_2'] ? "secondary" : "primary"}
                        onClick={() => setMyState('dollar_2')}>
                        <i className="icon-dollar_2"></i>
                    </IconButton>
                </Tooltip>
                <Tooltip title="35 and up dollars">
                    <IconButton aria-label=""
                        color={myStates['dollar_3'] ? "secondary" : "primary"}
                        onClick={() => setMyState('dollar_3')}>
                        <i className="icon-dollar_3"></i>
                    </IconButton>
                </Tooltip>
                <Tooltip title="Restaurants">
                    <IconButton aria-label=""
                        color={myStates['restaurant'] ? "secondary" : "primary"}
                        onClick={() => setMyState('restaurant')}>
                        <i className="icon-resturant"></i>
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
        </Fragment>
    );
}

export default DefaultBotToolBar;