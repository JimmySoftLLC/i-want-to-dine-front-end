import getRestaurantFromArray from './getRestaurantFromArray';
import {
    noSelectedRestaurant,
} from '../api/apiConstants';

const associateAccessLevel = (associatesRestaurants, restaurantId, associateId) => {
    if (restaurantId !== noSelectedRestaurant) {
        let myRestaurant = getRestaurantFromArray(associatesRestaurants, restaurantId)
        for (let j = 0; j < myRestaurant.associatesJSON.length; j++) {
            if (myRestaurant.associatesJSON[j].id === associateId) {
                return myRestaurant.associatesJSON[j].accessLevel;
            }
        }
    }
    return "none";
}

export default associateAccessLevel