const updateMenuDaysWithMenuAssociateChanges = (myMenuDays, myAssociates, myMenuItems) => {
    for (let i = 0; i < myMenuDays.associateIdsJSON.length; i++) {
        let saveMenuDay = false;
        for (let j = 0; i < myMenuDays[i].associateIdsJSON.length; j++) {
            if (myAssociates.findIndexOf(myMenuDays[i].myAssociateIdsJSON[j]) === -1) {
                myMenuDays.myAssoicateIdsJSON.splice(i, 1);
                saveMenuDay = true;
            }
        }
        for (let j = 0; i < myMenuDays[i].associateIdsJSON.length; j++) {
            if (myMenuItems.findIndexOf(myMenuDays[i].menuItemIdsJSON[j]) === -1) {
                myMenuDays.myAssoicateIdsJSON.splice(i, 1);
                saveMenuDay = true;
            }
        }
    }
    return myMenuDays
}

export default updateMenuDaysWithMenuAssociateChanges