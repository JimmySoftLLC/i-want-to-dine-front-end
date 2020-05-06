import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import DataAndMethodsContext from '../../context/dataAndMethods/dataAndMethodsContext';
import DeleteConfirmDialogContext from '../../context/deleteConfirmDialog/deleteConfirmDialogContext';
import getRestaurantAssociates from '../../model/restaurant/getRestaurantAssociates';
import putRestaurant from '../../model/restaurant/putRestaurant';
import getRestaurantFromArray from '../../model/restaurant/getRestaurantFromArray';
import sortAssociates from '../../model/associate/sortAssociates';
import associatesAccessLevel from '../../model/associate/associatesAccessLevel';
import AlertDialogContext from '../../context/alertDialog/alertDialogContext';
import deleteAssociateFromRestaurant from '../../model/restaurant/deleteAssociateFromRestaurant';
import getAssociate from '../../model/associate/getAssociate';
import getAssociatesRestaurants from '../../model/associate/getAssociatesRestaurants';
import updateMenuDaysWithAssociateChanges from '../../model/menuDay/updateMenuDaysWithAssociateChanges';

import {
    noSelectedRestaurant,
} from '../../api/apiConstants';

const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiButton-root': {
            margin: theme.spacing(1),
            marginLeft: 0,
        },
    },
}));

const AssociateCard = ({ Associate }) => {
    const classes = useStyles();
    const dataAndMethodsContext = useContext(DataAndMethodsContext);
    const {
        restaurantAssociates,
        setAssociateDialogData,
        setAssociateDialogOpen,
        idToken,
        customId,
        setRestaurantAssociates,
        associatesRestaurants,
        restaurantId,
        associate,
        setAssociatesRestaurants,
        setAssociate,
        setRestaurantId,
        setRestaurantMenuItems,
        setRestaurantMenuDays,
        restaurantMenuDays,
    } = dataAndMethodsContext;

    const deleteConfirmDialogContext = useContext(DeleteConfirmDialogContext);
    const { setDeleteConfirmDialog } = deleteConfirmDialogContext;

    const alertDialogContext = useContext(AlertDialogContext);

    const associateEditClick = (associateId) => {
        for (let i = 0; i < restaurantAssociates.length; i++) {
            if (associateId === restaurantAssociates[i].id) {
                let showEmail = false;
                if (restaurantAssociates[i].email === '') {
                    showEmail = true;
                }
                let myEditItem = {
                    id: restaurantAssociates[i].id,
                    firstName: restaurantAssociates[i].firstName,
                    lastName: restaurantAssociates[i].lastName,
                    bio: restaurantAssociates[i].bio,
                    jobTitle: restaurantAssociates[i].jobTitle,
                    email: restaurantAssociates[i].email,
                    restaurantIdsJSON: restaurantAssociates[i].restaurantIdsJSON,
                    accessLevel: restaurantAssociates[i].accessLevel,
                    imageUrl: restaurantAssociates[i].imageUrl,
                    dialogType: 'Edit',
                    showEmail: showEmail,
                }
                setAssociateDialogData(myEditItem);
                setAssociateDialogOpen(true);
                break;
            }
        }
    };

    const deleteAssociateClick = (associateId) => {
        for (let i = 0; i < restaurantAssociates.length; i++) {
            if (associateId === restaurantAssociates[i].id) {
                setDeleteConfirmDialog(true,
                    restaurantAssociates[i].firstName,
                    'deleteAssociate',
                    associateId,
                    deleteAssociateFromRestaurantById);
                break;
            }
        }
    };

    const deleteAssociateFromRestaurantById = async (associateId) => {
        // delete associate from restaurant and save restaurant to database
        let myRestaurant = getRestaurantFromArray(associatesRestaurants, restaurantId)
        myRestaurant = await deleteAssociateFromRestaurant(restaurantId, associateId, myRestaurant, true, idToken, customId)
        if (!myRestaurant) {
            alertDialogContext.setDialog(true, 'Must have at least one admin for restaurant cannot remove associate.', 'Error');
            return null;
        }
        await putRestaurant(myRestaurant, idToken, customId)
        // get logged in associate and update associates restaurants
        const newAssociate = await getAssociate(associate.id, idToken, customId)
        const newAssociatesRestaurants = await getAssociatesRestaurants(newAssociate)
        setAssociate(newAssociate)
        setAssociatesRestaurants(newAssociatesRestaurants)
        // update associates for current restaurant
        let myAssociates = await getRestaurantAssociates(myRestaurant)
        myAssociates = await sortAssociates(myAssociates, newAssociate);
        setRestaurantAssociates(myAssociates)
        // update menu days with changes
        let myNewMenuDays = await updateMenuDaysWithAssociateChanges(restaurantMenuDays, myAssociates, idToken, customId)
        setRestaurantMenuDays(myNewMenuDays)
        // reset everything if logged in associate is the one deleted
        if (associateId === associate.id) {
            setRestaurantMenuItems([]);
            setRestaurantMenuDays([]);
            setRestaurantAssociates([]);
            setRestaurantId(noSelectedRestaurant);
        }
    }

    // only associates who can admin to edit associate accounts
    let canAdmin = false;
    associatesAccessLevel(associatesRestaurants, restaurantId, associate.id) === "admin" ? canAdmin = true : canAdmin = false

    // set icons for associate
    let thisAssociateAccessLevel = '';
    switch (associatesAccessLevel(associatesRestaurants, restaurantId, Associate.id)) {
        case 'none':
            thisAssociateAccessLevel = 'fas fa-user';
            break;
        case 'read':
            thisAssociateAccessLevel = 'icon-user-read';
            break;
        case 'edit':
            thisAssociateAccessLevel = 'fas fa-user-edit';
            break;
        case 'admin':
            thisAssociateAccessLevel = 'fas fa-user-cog';
            break;
        default:
    }

    // set name of associate
    let associateName = Associate.firstName + ' ' + Associate.lastName
    if (Associate.firstName.length === 0 && Associate.lastName.length === 0) {
        associateName = Associate.email;
    }

    // add logged in user message if this associate is the logged in user
    let message
    if (associate.id === Associate.id) {
        message = "Logged in user"
    }

    // console.log(Associate)

    return (
        <div className='card'>
            {Associate.imageUrl !== undefined && <div>
                <img
                    src={Associate.imageUrl}
                    alt=''
                    className='round-img'
                    style={{ width: '80px', height: '80px' }}
                />
            </div>}
            <div>
                <h4><i className={thisAssociateAccessLevel}></i>{' - '}{associateName}
                </h4>
                <div className={classes.root} >
                    <p>{message}</p>
                    {canAdmin && <Button variant="outlined" color="primary" onClick={() => associateEditClick(Associate.id)}>
                        <i className={"fas fa-edit"}></i>
                    </Button>}
                    {canAdmin && <Button variant="outlined" color="primary" onClick={() => deleteAssociateClick(Associate.id)}>
                        <i className="fas fa-trash"></i>
                    </Button>}
                </div>
            </div>

        </div>
    );
};

export default AssociateCard;