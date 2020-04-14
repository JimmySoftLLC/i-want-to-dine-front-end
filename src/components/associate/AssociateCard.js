import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import DataAndMethodsContext from '../../context/dataAndMethods/dataAndMethodsContext';
import DeleteConfirmDialogContext from '../../context/deleteConfirmDialog/deleteConfirmDialogContext';
import findIndexOfAssociateInRestaurant from '../../model/findIndexOfAssociateInRestaurant';
import putAssociate from '../../model/putAssociate';
import getRestaurantAssociates from '../../model/getRestaurantAssociates';
import putRestaurant from '../../model/putRestaurant';
import getRestaurantFromArray from '../../model/getRestaurantFromArray';
import removeRestaurantFromAssociate from '../../model/removeRestaurantFromAssociate';
import removeAssociateFromRestaurant from '../../model/removeAssociateFromRestaurant';
import getAssociateFromRestaurant from '../../model/getAssociateFromRestaurant';
import sortAssociates from '../../model/sortAssociates';
import getAssociate from '../../model/getAssociate';
import associateAccessLevel from '../../model/associateAccessLevel';
import checkIfOneAdminInRestaurant from '../../model/checkIfOneAdminInRestaurant';
import AlertDialogContext from '../../context/alertDialog/alertDialogContext';

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
    } = dataAndMethodsContext;

    const deleteConfirmDialogContext = useContext(DeleteConfirmDialogContext);
    const { setDeleteConfirmDialog } = deleteConfirmDialogContext;

    const alertDialogContext = useContext(AlertDialogContext);

    const handleClickAssociateEdit = (associateId) => {
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
                    dialogType: 'Edit',
                    showEmail: showEmail,
                }
                setAssociateDialogData(myEditItem);
                setAssociateDialogOpen(true);
                break;
            }
        }
    };

    const loadDeleteAssociateFromRestaurantDialog = (associateId) => {
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

    // find index where assoicate is in restaurant associates array
    // figure out if associate can be removed, restaurant always must have at least one admin
    // remove restaurant from associates restaurant array and save assocaite to database
    // remove associate from restaurant associate array and save restaurant to database
    // update states as needed
    const deleteAssociateFromRestaurantById = async (associateId) => {
        let myRestaurant = getRestaurantFromArray(associatesRestaurants, restaurantId)
        let myAssociate = getAssociateFromRestaurant(myRestaurant, associateId)
        let myIndex = findIndexOfAssociateInRestaurant(myRestaurant, associateId)
        // check if can remove this assoiciate
        let tempRestaurant = JSON.parse(JSON.stringify(myRestaurant))
        tempRestaurant.associatesJSON.splice(myIndex, 1)
        if (!checkIfOneAdminInRestaurant(tempRestaurant)) {
            alertDialogContext.setDialog(true, 'Must have at least one admin for restaurant cannot remove associate.', 'Error');
            return null;
        }
        myRestaurant = await removeAssociateFromRestaurant(myRestaurant, associateId)
        myAssociate = await removeRestaurantFromAssociate(myAssociate, restaurantId)
        // if associate in database save update to database
        const tempAssociate = await getAssociate(myAssociate.id, idToken, customId)
        if (tempAssociate) {
            await putAssociate(myAssociate, idToken, customId)
        }
        // console.log(myRestaurant, myAssociate)
        await putRestaurant(myRestaurant, idToken, customId)
        let myAssociates = await getRestaurantAssociates(myRestaurant)
        myAssociates = await sortAssociates(myAssociates, associate);
        setRestaurantAssociates(myAssociates)
    }

    // only associates who can admin to edit associate accounts
    let canAdmin = false;
    associateAccessLevel(associatesRestaurants, restaurantId, associate.id) === "admin" ? canAdmin = true : canAdmin = false


    let thisAssociateAccessLevel = '';
    switch (associateAccessLevel(associatesRestaurants, restaurantId, Associate.id)) {
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

    let associateName = Associate.firstName + ' ' + Associate.lastName
    if (Associate.firstName.length === 0 && Associate.lastName.length === 0) {
        associateName = Associate.email;
    }

    let message
    if (associate.id === Associate.id) {
        message = "Logged in user"
    }

    return (
        <div className='card'>
            <h4><i className={thisAssociateAccessLevel}></i>{' - '}{associateName}
            </h4>
            <div className={classes.root} >
                <p>{message}</p>
                {canAdmin && <Button variant="outlined" color="primary" onClick={() => handleClickAssociateEdit(Associate.id)}>
                    <i className={"fas fa-edit"}></i>
                </Button>}
                {canAdmin && <Button variant="outlined" color="primary" onClick={() => loadDeleteAssociateFromRestaurantDialog(Associate.id)}>
                    <i className="fas fa-trash"></i>
                </Button>}
            </div>
        </div>
    );
};

export default AssociateCard;