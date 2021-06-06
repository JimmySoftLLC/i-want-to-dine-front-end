import findIndexOfAssociateInRestaurant from './findIndexOfAssociateInRestaurant';

const getAssociatesForRestaurant = (restaurant, associates) => {
    let myAssociates = [];
    for (let i = 0; i < associates.length; i++) {
        if (findIndexOfAssociateInRestaurant(restaurant, associates[i].id) !== -1) {
            myAssociates.push(JSON.parse(JSON.stringify(associates[i])))
        }
    }

    return myAssociates;
}

export default getAssociatesForRestaurant