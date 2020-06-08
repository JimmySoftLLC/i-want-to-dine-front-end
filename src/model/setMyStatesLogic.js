// const turnOffAllMyStates = (myStates, key) => {
//     for (key in myStates) {
//         if (key !== 'dollar_1' && key !== 'dollar_2' && key !== 'dollar_3') {
//             myStates[key] = false;
//         }
//     }
//     return myStates;
// }

const setMyStatesLogic = (myStates, key) => {

    if (myStates.helpDialogActive) {
        switch (myStates.helpDialogStage) {
            case 1:
                if (key === "menuItems") {
                    myStates.helpDialogOpen = true;
                    myStates.helpDialogStage = 2;
                }
                if (key === "restaurants") {
                    myStates.helpDialogOpen = true;
                    myStates.helpDialogStage = 5;
                }
                if (key === "associates") {
                    myStates.helpDialogOpen = true;
                    myStates.helpDialogStage = 6;
                }
                if (key === "entertainmentItems") {
                    myStates.helpDialogOpen = true;
                    myStates.helpDialogStage = 7;
                }
                if (key === "photoGallery") {
                    myStates.helpDialogOpen = true;
                    myStates.helpDialogStage = 8;
                }
                if (key === "info") {
                    myStates.helpDialogOpen = true;
                    myStates.helpDialogStage = 9;
                }
                break;
            case 2:
                if (key === "specials" ||
                    key === "soup" ||
                    key === "salad" ||
                    key === "appetizers" ||
                    key === "sandwich" ||
                    key === "pizza" ||
                    key === "pasta" ||
                    key === "entree" ||
                    key === "dessert" ||
                    key === "drinks" ||
                    key === "kids"
                ) {
                    myStates.helpDialogOpen = true;
                    myStates.helpDialogStage = 3;
                }
                break;
            case 3:
                if (key === "meat" ||
                    key === "pork" ||
                    key === "poultry" ||
                    key === "fish" ||
                    key === "shellfish" ||
                    key === "vegetarian" ||
                    key === "cheese" ||
                    key === "carryout"
                ) {
                    myStates.helpDialogOpen = true;
                    myStates.helpDialogStage = 4;
                }
                break;
            case 4:
                if (key === "dollar_1" ||
                    key === "dollar_2" ||
                    key === "dollar_3"
                ) {
                    myStates.helpDialogOpen = true;
                    myStates.helpDialogStage = 5;
                }
                break;
            case 5:
                break;
            default:
                break;
        }
    }

    // if myKey = any of the loggin items, set login items to false and set key
    if (key === 'restaurantSettings' || key === 'menuSettings' || key === 'menuDaySettings' || key === 'associateSettings' || key === 'entertainmentSettings' || key === 'photoSettings') {
        myStates['restaurantSettings'] = false;
        myStates['menuSettings'] = false;
        myStates['menuDaySettings'] = false;
        myStates['associateSettings'] = false;
        myStates['entertainmentSettings'] = false;
        myStates['photoSettings'] = false;
        myStates[key] = true;
        return myStates;
    }

    // if myKey = any of the loggin items, set login items to false and set key
    if (key === 'restaurants' || key === 'menuItems' || key === 'associates' || key === 'info' || key === 'restaurantDetail' || key === 'entertainmentItems' || key === 'photoGallery') {
        myStates['restaurants'] = false;
        myStates['menuItems'] = false;
        myStates['associates'] = false;
        myStates['info'] = false;
        myStates['restaurantDetail'] = false;
        myStates['entertainmentItems'] = false;
        myStates['photoGallery'] = false;
        if (key !== 'restaurantDetail') {
            myStates['lastState'] = key;
        }
        myStates[key] = true;
        return myStates;
    }

    // if myKey = any of the sort items, set sort items to false and set key
    if (key === 'sortTitle' || key === 'sortPrice') {
        myStates['sortTitle'] = false;
        myStates['sortPrice'] = false;
        myStates[key] = true;
        return myStates;
    }

    myStates[key] ? myStates[key] = false : myStates[key] = true;

    return myStates;
}

export default setMyStatesLogic

