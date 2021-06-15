const itemInList = (myFoodCategories: any, myMenuItemCategories: any) => {
    for (let i = 0; i < myMenuItemCategories.length; i++) {
        if (myFoodCategories[myMenuItemCategories[i]]) { return true }
    }
    return false
}

const menuItemsWithCategories = (restaurantMenuItems: any[], myStates: any) => {
    let myFoodCategories: any = {}
    if (myStates) {
        if (myStates.meat) { myFoodCategories['meat'] = true }
        if (myStates.pork) { myFoodCategories['pork'] = true }
        if (myStates.poultry) { myFoodCategories['poultry'] = true }
        if (myStates.fish) { myFoodCategories['fish'] = true }
        if (myStates.shellfish) { myFoodCategories['shellfish'] = true }
        if (myStates.vegetarian) { myFoodCategories['vegetarian'] = true }
        if (myStates.cheese) { myFoodCategories['cheese'] = true }
        if (myStates.carryout) { myFoodCategories['carryout'] = true }
    }

    let myCategories: any = {
        specials: [],
        soup: [],
        salad: [],
        appetizers: [],
        sandwich: [],
        pizza: [],
        pasta: [],
        entree: [],
        dessert: [],
        drinks: [],
        wine: [],
        beer: [],
        coffee: [],
        kids: [],
        notCatgorized: [],
    }
    let foundItem = false
    for (let i = 0; i < restaurantMenuItems.length; i++) {
        foundItem = false;
        if (restaurantMenuItems[i].categoryJSON.indexOf('specials') !== -1) {
            if (myStates) {
                if (itemInList(myFoodCategories, restaurantMenuItems[i].categoryJSON)) {
                    myCategories.specials.push(restaurantMenuItems[i])
                    foundItem = true;
                }
            } else {
                myCategories.specials.push(restaurantMenuItems[i])
                foundItem = true;
            }
        }
        if (restaurantMenuItems[i].categoryJSON.indexOf('soup') !== -1) {
            if (myStates) {
                if (itemInList(myFoodCategories, restaurantMenuItems[i].categoryJSON)) {
                    myCategories.soup.push(restaurantMenuItems[i])
                    foundItem = true;
                }
            } else {
                myCategories.soup.push(restaurantMenuItems[i])
                foundItem = true;
            }
        }
        if (restaurantMenuItems[i].categoryJSON.indexOf('salad') !== -1) {
            if (myStates) {
                if (itemInList(myFoodCategories, restaurantMenuItems[i].categoryJSON)) {
                    myCategories.salad.push(restaurantMenuItems[i])
                    foundItem = true;
                }
            } else {
                myCategories.salad.push(restaurantMenuItems[i])
                foundItem = true;
            }
        }
        if (restaurantMenuItems[i].categoryJSON.indexOf('appetizers') !== -1) {
            if (myStates) {
                if (itemInList(myFoodCategories, restaurantMenuItems[i].categoryJSON)) {
                    myCategories.appetizers.push(restaurantMenuItems[i])
                    foundItem = true;
                }
            } else {
                myCategories.appetizers.push(restaurantMenuItems[i])
                foundItem = true;
            }

        }
        if (restaurantMenuItems[i].categoryJSON.indexOf('sandwich') !== -1) {
            if (myStates) {
                if (itemInList(myFoodCategories, restaurantMenuItems[i].categoryJSON)) {
                    myCategories.sandwich.push(restaurantMenuItems[i])
                    foundItem = true;
                }
            } else {
                myCategories.sandwich.push(restaurantMenuItems[i])
                foundItem = true;
            }
        }
        if (restaurantMenuItems[i].categoryJSON.indexOf('pizza') !== -1) {
            if (myStates) {
                if (itemInList(myFoodCategories, restaurantMenuItems[i].categoryJSON)) {
                    myCategories.pizza.push(restaurantMenuItems[i])
                    foundItem = true;
                }
            } else {
                myCategories.pizza.push(restaurantMenuItems[i])
                foundItem = true;
            }
        }
        if (restaurantMenuItems[i].categoryJSON.indexOf('pasta') !== -1) {
            if (myStates) {
                if (itemInList(myFoodCategories, restaurantMenuItems[i].categoryJSON)) {
                    myCategories.pasta.push(restaurantMenuItems[i])
                    foundItem = true;
                }
            } else {
                myCategories.pasta.push(restaurantMenuItems[i])
                foundItem = true;
            }
        }
        if (restaurantMenuItems[i].categoryJSON.indexOf('entree') !== -1) {
            if (myStates) {
                if (itemInList(myFoodCategories, restaurantMenuItems[i].categoryJSON)) {
                    myCategories.entree.push(restaurantMenuItems[i])
                    foundItem = true;
                }
            } else {
                myCategories.entree.push(restaurantMenuItems[i])
                foundItem = true;
            }
        }
        if (restaurantMenuItems[i].categoryJSON.indexOf('dessert') !== -1) {
            myCategories.dessert.push(restaurantMenuItems[i])
            foundItem = true;
        }
        if (restaurantMenuItems[i].categoryJSON.indexOf('drinks') !== -1) {
            myCategories.drinks.push(restaurantMenuItems[i])
            foundItem = true;
        }
        if (restaurantMenuItems[i].categoryJSON.indexOf('wine') !== -1) {
            myCategories.wine.push(restaurantMenuItems[i])
            foundItem = true;
        }
        if (restaurantMenuItems[i].categoryJSON.indexOf('beer') !== -1) {
            myCategories.beer.push(restaurantMenuItems[i])
            foundItem = true;
        }
        if (restaurantMenuItems[i].categoryJSON.indexOf('coffee') !== -1) {
            myCategories.coffee.push(restaurantMenuItems[i])
            foundItem = true;
        }
        if (restaurantMenuItems[i].categoryJSON.indexOf('kids') !== -1) {
            if (myStates) {
                if (itemInList(myFoodCategories, restaurantMenuItems[i].categoryJSON)) {
                    myCategories.kids.push(restaurantMenuItems[i])
                    foundItem = true;
                }
            } else {
                myCategories.kids.push(restaurantMenuItems[i])
                foundItem = true;
            }
        }
        if (!foundItem) {
            myCategories.notCatgorized.push(restaurantMenuItems[i])
        }
    }
    return myCategories
}

export default menuItemsWithCategories;