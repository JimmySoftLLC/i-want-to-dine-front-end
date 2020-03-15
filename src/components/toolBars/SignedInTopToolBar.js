import React, { Fragment, useContext } from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import DataAndMethodsContext from '../../context/dataAndMethods/dataAndMethodsContext';
import { Tooltip } from '@material-ui/core';

const SignedInTopToolBar = () => {
    const dataAndMethodsContext = useContext(DataAndMethodsContext);
    const { getAssociatesResturants, restaurants } = dataAndMethodsContext;

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
                        <IconButton aria-label="" color="default"
                            onClick={() => getAssociatesResturants(restaurants)}
                        >
                            <i className="fas fa-store-alt"></i>
                        </IconButton>
                    </Tooltip>
                </div>
            </Toolbar>
        </Fragment>
    );
}

export default SignedInTopToolBar;