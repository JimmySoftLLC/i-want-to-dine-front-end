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
    if (key === 'restaurantSettngs' || key === 'menuSettings' || key === 'menuDaySettngs' || key === 'associateSettngs') {
        myStates['restaurantSettngs'] = false;
        myStates['menuSettings'] = false;
        myStates['menuDaySettngs'] = false;
        myStates['associateSettngs'] = false;
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

    // if myKey = info and info off, turn all food myStates off, turn info on
    if (key === 'info' && !myStates['info']) {
        myStates = turnOffAllMyStates(myStates);
        myStates['info'] = true;
        return myStates;
    }
    // if myKey = info and info on, turn off all, turn meat on, turn dollar_2 on
    if (key === 'info' && myStates['info']) {
        myStates = turnOffAllMyStates(myStates);
        myStates['meat'] = true;
        return myStates;
    }
    // if myKey = restaurant and restaurant off, turn all food myStates off, turn restaurant on
    if (key === 'restaurant' && !myStates['restaurant']) {
        myStates = turnOffAllMyStates(myStates);
        myStates['restaurant'] = true;
        return myStates;
    }
    // if myKey = restaurant and restaurant on, turn off all, turn meat on, turn dollar_2 on
    if (key === 'restaurant' && myStates['restaurant']) {
        myStates = turnOffAllMyStates(myStates);
        myStates['meat'] = true;
        return myStates;
    }
    // flip food key, turn info off, turn restaurant off
    myStates[key] ? myStates[key] = false : myStates[key] = true;
    myStates['info'] = false;
    myStates['restaurant'] = false;
    return myStates;
}

export default setMyStatesLogic

