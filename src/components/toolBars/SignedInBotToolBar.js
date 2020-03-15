import React, { Fragment, useContext } from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import DataAndMethodsContext from '../../context/dataAndMethods/dataAndMethodsContext';
import { Tooltip } from '@material-ui/core';

const SignedInBotToolBar = () => {
    const dataAndMethodsContext = useContext(DataAndMethodsContext);
    const {
        setAuthToken,
        setIdToken,
        setCustomId,
        setLogInType,
    } = dataAndMethodsContext;

    const logOut = () => {
        setAuthToken('');
        setIdToken('');
        setCustomId('');
        setLogInType('default');
    }

    return (
        <Fragment>
            <Toolbar showLabel="false" color="primary">
                <Tooltip title="Edit associate details">
                    <IconButton aria-label=""
                        color="primary"
                        onClick={() => logOut()}>
                        <i className="fas fa-user-edit"></i>
                    </IconButton>
                </Tooltip>
                <Tooltip title="Log out">
                    <IconButton aria-label=""
                        color="primary"
                        onClick={() => logOut()}>
                        <i className="fas fa-sign-out-alt"></i>
                    </IconButton>
                </Tooltip>
            </Toolbar>
        </Fragment>
    );
}

export default SignedInBotToolBar;