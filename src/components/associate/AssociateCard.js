import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { v4 as uuidv4 } from 'uuid';
import DataAndMethodsContext from '../../context/dataAndMethods/dataAndMethodsContext';
import DeleteConfirmDialogContext from '../../context/deleteConfirmDialog/deleteConfirmDialogContext';
import deleteAssociate from '../../model/deleteAssociate';
import getRestaurantAssociates from '../../model/getRestaurantAssociates';
import putRestaurant from '../../model/putRestaurant';
import getRestaurantFromArray from '../../model/getRestaurantFromArray';
import sortAssociates from '../../model/sortAssociates';
import associateAccessLevel from '../../model/associateAccessLevel';

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

    const handleClickAssociateEdit = (AssociateId) => {
        for (let i = 0; i < restaurantAssociates.length; i++) {
            if (AssociateId === restaurantAssociates[i].id) {
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
                }
                setAssociateDialogData(myEditItem);
                setAssociateDialogOpen(true);
                break;
            }
        }
    };

    const loadDeleteAssociateDialog = (AssociateId) => {
        for (let i = 0; i < restaurantAssociates.length; i++) {
            if (AssociateId === restaurantAssociates[i].id) {
                setDeleteConfirmDialog(true,
                    restaurantAssociates[i].firstName,
                    'deleteAssociate',
                    AssociateId,
                    deleteAssociateNow);
                break;
            }
        }
    };

    const deleteAssociateNow = async (associateId) => {
        await deleteAssociate(associateId, idToken, customId)
        let myRestaurant = getRestaurantFromArray(associatesRestaurants, restaurantId)
        console.log(myRestaurant);
        let myIndex = myRestaurant.associatesJSON.indexOf(associateId, 0)
        myRestaurant.associatesJSON.splice(myIndex, 1)
        await putRestaurant(myRestaurant, idToken, customId)
        let myAssociates = await getRestaurantAssociates(myRestaurant)
        myAssociates = await sortAssociates(myAssociates, 'sortName');
        setRestaurantAssociates(myAssociates)
    }

    // only associates who can admin to edit associate accounts
    let canAdmin = false;
    associateAccessLevel(associatesRestaurants, restaurantId, associate.id) === "admin" ? canAdmin = true : canAdmin = false


    return (
        <div className='card'>
            <h4><i className="fas fa-user"></i>{' - '}{Associate.firstName}{' '}{Associate.lastName}
            </h4>
            <div className={classes.root} >
                {canAdmin && <Button variant="outlined" color="primary" onClick={() => handleClickAssociateEdit(Associate.id)}>
                    <i className="fas fa-edit"></i>
                </Button>}
                {canAdmin && <Button variant="outlined" color="primary" onClick={() => loadDeleteAssociateDialog(Associate.id)}>
                    <i className="fas fa-trash"></i>
                </Button>}
            </div>
        </div>
    );
};

export default AssociateCard;