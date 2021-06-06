import React, { useContext } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import DataAndMethodsContext from '../../context/dataAndMethods/dataAndMethodsContext';
import associatesAccessLevel from '../../model/associate/associatesAccessLevel';

const AssociateCardMenuDay = (associate: any) => {
    const dataAndMethodsContext: any = useContext(DataAndMethodsContext);
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

    const changeAssociateClick = () => {
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
    switch (associatesAccessLevel(associatesRestaurants, restaurantId, associate.id)) {
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

    let associateName = associate.firstName + ' ' + associate.lastName

    if (associate.firstName.length < 2 && associate.lastName.length < 2) {
        associateName = associate.email;
    }

    return (
        <div className='card'>
            <h4>
                <Checkbox
                    checked={associateSelected}
                    onChange={changeAssociateClick}
                    name="checked"
                    color="primary"
                />
                {' - '}<i className={thisAssociateAccessLevel}></i>{' - '}{associateName}
            </h4>
        </div>
    );
};

export default AssociateCardMenuDay;