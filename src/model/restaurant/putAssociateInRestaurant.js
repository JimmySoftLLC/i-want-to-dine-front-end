import validEmail from "../validEmail";
import { v4 as uuidv4 } from 'uuid';

// search associatesJSON for matching id overwrite or insert if does not exist
const putAssociateInRestaurant = (myRestaurant, myAssociate) => {
    let foundAssociate = false
    for (let i = 0; i < myRestaurant.associatesJSON.length; i++) {
        if (myRestaurant.associatesJSON[i].id === myAssociate.id) {
            if (validEmail(myAssociate.id) && myAssociate.accessLevel === "none") {
                let myId = uuidv4();
                myAssociate.id = myId;
            }
            myRestaurant.associatesJSON[i] = JSON.parse(JSON.stringify(myAssociate))
            foundAssociate = true;
            break;
        }
    }
    if (!foundAssociate) {
        myRestaurant.associatesJSON.push(JSON.parse(JSON.stringify(myAssociate)))
    }
    return myRestaurant;
}

export default putAssociateInRestaurant