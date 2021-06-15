import putMenuDay from './putMenuDay';
import findIndexOfAssociate from '../associate/findIndexOfAssociate';

const updateMenuDaysWithAssociateChanges = async (myMenuDays: any, myAssociates: any, myToken: any, myCustomId: any) => {
    for (let i = 0; i < myMenuDays.length; i++) {
        let myNewAssociateIdsJSON = [];
        for (let j = 0; j < myMenuDays[i].associatesJSON.length; j++) {
            let myIndex = findIndexOfAssociate(myAssociates, myMenuDays[i].associatesJSON[j]);
            if (myIndex !== -1) {
                myNewAssociateIdsJSON.push(myMenuDays[i].associatesJSON[j])
            }
        }
        if (myNewAssociateIdsJSON.length !== myMenuDays[i].associatesJSON.length) {
            myMenuDays[i].associatesJSON = myNewAssociateIdsJSON;
            await putMenuDay(myMenuDays[i], myToken, myCustomId);
        }
    }
    return myMenuDays
}

export default updateMenuDaysWithAssociateChanges