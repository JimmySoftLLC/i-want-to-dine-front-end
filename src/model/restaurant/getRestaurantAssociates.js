import validEmail from '../validEmail';
import getAssociateFromRestaurant from '../associate/getAssociateFromRestaurant';
import getAssociates from '../associate/getAssociates';

// get associates from the database if they have emails, otherwise get them from restaurant associateJSON
// do this by creating an array of associateIds for records that have email, these will be on server
// those that don't have email are local to the restaurant just use that record instead
const getRestaurantAssociates = async (restaurant) => {
    let restaurantAssociates = restaurant.associatesJSON;
    let associateIds = [];
    let myRestaurantAssociates = [];
    let myRestaurantAssociatesNoEmail = [];

    for (let i = 0; i < restaurantAssociates.length; i++) {
        if (validEmail(restaurantAssociates[i].email)) {
            associateIds.push(restaurantAssociates[i].id);
        } else {
            myRestaurantAssociatesNoEmail.push(restaurantAssociates[i]);
        }
    }

    // get records from the database
    myRestaurantAssociates = await getAssociates(associateIds)

    // now add access to records from the database, restaurant access exists in restaurant only
    for (let i = 0; i < myRestaurantAssociates.length; i++) {
        myRestaurantAssociates[i].accessLevel = getAssociateFromRestaurant(restaurant, myRestaurantAssociates[i].id).accessLevel
    }

    // console.log(myRestaurantAssociates, myRestaurantAssociatesNoEmail);

    // now add local records
    myRestaurantAssociates = myRestaurantAssociates.concat(myRestaurantAssociatesNoEmail)

    return myRestaurantAssociates;
}

export default getRestaurantAssociates