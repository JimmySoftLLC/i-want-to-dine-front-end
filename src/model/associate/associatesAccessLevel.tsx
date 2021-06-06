import getRestaurantById from '../restaurant/getRestaurantById';
import {
    noSelectedRestaurant,
} from '../../api/apiConstants';

const associatesAccessLevel = (associatesRestaurants: any, restaurantId: string, associateId: any): any => {
    try {
        if (restaurantId !== noSelectedRestaurant) {
            let myRestaurant = getRestaurantById(associatesRestaurants, restaurantId)
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