const turnOffAllMyStates = (myStates, key) => {
    for (key in myStates) {
        if (key !== 'dollar_1' && key !== 'dollar_2' && key !== 'dollar_3') {
            myStates[key] = false;
        }
    }
    return myStates;
}

const setMyStatesLogic = (myStates, key) => {
    // if myKey = any of the loggin items, set login items to false and set key
    if (key === 'restaurantSettings' || key === 'menuSettings' || key === 'menuDaySettings' || key === 'associateSettings') {
        myStates['restaurantSettings'] = false;
        myStates['menuSettings'] = false;
        myStates['menuDaySettings'] = false;
        myStates['associateSettings'] = false;
        myStates[key] = true;
        return myStates;
    }

    // if myKey = any of the loggin items, set login items to false and set key
    if (key === 'restaurants' || key === 'menuItems' || key === 'associates' || key === 'info' || key === 'restaurantDetail') {
        myStates['restaurants'] = false;
        myStates['menuItems'] = false;
        myStates['associates'] = false;
        myStates['info'] = false;
        myStates['restaurantDetail'] = false;
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

