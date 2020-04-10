import React, { useContext } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import DataAndMethodsContext from '../../context/dataAndMethods/dataAndMethodsContext';
import associateAccessLevel from '../../model/associateAccessLevel';

const AssociateCardMenuDay = ({ associate }) => {
    const dataAndMethodsContext = useContext(DataAndMethodsContext);
    const { menuDayDialogData,
        setMenuDayDialogData,
        associatesRestaurants,
        restaurantId,
    } = dataAndMethodsContext;

    let associateSelected = false;
    for (let j = 0; j < menuDayDialogData.associatesJSON.length; j++) {
        if (associate.id === menuDayDialogData.associatesJSON[j]) {
            associateSelected = true;
            break;
        }
    }

    const changeAssociateSelected = () => {
        let myNewMenuDayDialogData = JSON.parse(JSON.stringify(menuDayDialogData))
        let myIndex = myNewMenuDayDialogData.associatesJSON.indexOf(associate.id, 0)
        if (myIndex !== -1) {
            myNewMenuDayDialogData.associatesJSON.splice(myIndex, 1)
        } else {
            myNewMenuDayDialogData.associatesJSON.push(associate.id)
        }
        setMenuDayDialogData(myNewMenuDayDialogData)
    }

    let thisAssociateAccessLevel = '';
    switch (associateAccessLevel(associatesRestaurants, restaurantId, associate.id)) {
        case 'none':
            thisAssociateAccessLevel = 'fas fa-user';
            break;
        case 'view':
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

    let associateName = associate.firstName + ' ' + associate.lastName

    if (associate.firstName.length < 2 && associate.lastName.length < 2) {
        associateName = associate.email;
    }

    return (
        <div className='card'>
            <h4>
                <Checkbox
                    checked={associateSelected}
                    onChange={changeAssociateSelected}
                    name="checked"
                    color="primary"
                />
                {' - '}<i className={thisAssociateAccessLevel}></i>{' - '}{associateName}
            </h4>
        </div>
    );
};

export default AssociateCardMenuDay;