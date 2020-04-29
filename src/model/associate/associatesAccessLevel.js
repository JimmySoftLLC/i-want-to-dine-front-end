import getRestaurantFromArray from '../restaurant/getRestaurantFromArray';
import {
    noSelectedRestaurant,
} from '../../api/apiConstants';

const associatesAccessLevel = (associatesRestaurants, restaurantId, associateId) => {
    try {
        if (restaurantId !== noSelectedRestaurant) {
            let myRestaurant = getRestaurantFromArray(associatesRestaurants, restaurantId)
            for (let j = 0; j < myRestaurant.associatesJSON.length; j++) {
                if (myRestaurant.associatesJSON[j].id === associateId) {
                    return myRestaurant.associatesJSON[j].accessLevel;
                }
            }
        }
    } catch (error) {

    }
    return "none";
}

export default associatesAccessLevel