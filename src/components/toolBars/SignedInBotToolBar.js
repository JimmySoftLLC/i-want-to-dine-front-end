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
        setAssociateDialogData,
        setAssociateDialogOpen,
        associate,
    } = dataAndMethodsContext;

    const logOut = () => {
        setAuthToken('');
        setIdToken('');
        setCustomId('');
        setLogInType('default');
    }

    const handleEditAssociate = () => {
        let myAssociateData = {
            id: associate.id,
            canWrite: associate.canWrite,
            canAdmin: associate.canAdmin,
            firstName: associate.firstName,
            lastName: associate.lastName,
            jobTitle: associate.jobTitle,
            bio: associate.bio,
            email: associate.email,
            restaurantIdsJSON: associate.restaurantIdsJSON,
            dialogType: "Edit",
        };
        setAssociateDialogData(myAssociateData);
        setAssociateDialogOpen(true);
    };

    return (
        <Fragment>
            <Toolbar showLabel="false" color="primary">
                <Tooltip title="Edit associate details">
                    <IconButton aria-label=""
                        color="primary"
                        onClick={() => handleEditAssociate()}>
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