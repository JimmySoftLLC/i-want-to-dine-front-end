const turnOffAllCategories = (categories, key) => {
    for (key in categories) {
        if (key !== 'dollar_1' && key !== 'dollar_2' && key !== 'dollar_3') {
            categories[key] = false;
        }
    }
    return categories;
}

const setFoodCategories = (categories, key) => {
    // if myKey = any of the loggin items, set login items to false and set key
    if (key === 'restaurantSettngs' || key === 'menuSettngs' || key === 'menuDaySettngs') {
        categories['restaurantSettngs'] = false;
        categories['menuSettngs'] = false;
        categories['menuDaySettngs'] = false;
        categories[key] = true;
        return categories;
    }
    // if myKey = info and info off, turn all food categories off, turn info on
    if (key === 'info' && !categories['info']) {
        categories = turnOffAllCategories(categories);
        categories['info'] = true;
        return categories;
    }
    // if myKey = info and info on, turn off all, turn meat on, turn dollar_2 on
    if (key === 'info' && categories['info']) {
        categories = turnOffAllCategories(categories);
        categories['meat'] = true;
        return categories;
    }
    // if myKey = restaurant and restaurant off, turn all food categories off, turn restaurant on
    if (key === 'restaurant' && !categories['restaurant']) {
        categories = turnOffAllCategories(categories);
        categories['restaurant'] = true;
        return categories;
    }
    // if myKey = restaurant and restaurant on, turn off all, turn meat on, turn dollar_2 on
    if (key === 'restaurant' && categories['restaurant']) {
        categories = turnOffAllCategories(categories);
        categories['meat'] = true;
        return categories;
    }
    // flip food key, turn info off, turn restaurant off
    categories[key] ? categories[key] = false : categories[key] = true;
    categories['info'] = false;
    categories['restaurant'] = false;
    return categories;
}

export default setFoodCategories

