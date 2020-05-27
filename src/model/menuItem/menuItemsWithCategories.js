const menuItemsWithCategories = (restaurantMenuItems) => {
    let myCategories = {
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
        kids: [],
        notCatgorized: [],
    }
    let foundItem = false
    for (let i = 0; i < restaurantMenuItems.length; i++) {
        foundItem = false;
        if (restaurantMenuItems[i].categoryJSON.indexOf('specials') !== -1) {
            myCategories.specials.push(restaurantMenuItems[i])
            foundItem = true;
        }
        if (restaurantMenuItems[i].categoryJSON.indexOf('soup') !== -1) {
            myCategories.soup.push(restaurantMenuItems[i])
            foundItem = true;
        }
        if (restaurantMenuItems[i].categoryJSON.indexOf('salad') !== -1) {
            myCategories.salad.push(restaurantMenuItems[i])
            foundItem = true;
        }
        if (restaurantMenuItems[i].categoryJSON.indexOf('appetizers') !== -1) {
            myCategories.appetizers.push(restaurantMenuItems[i])
            foundItem = true;
        }
        if (restaurantMenuItems[i].categoryJSON.indexOf('sandwich') !== -1) {
            myCategories.sandwich.push(restaurantMenuItems[i])
            foundItem = true;
        }
        if (restaurantMenuItems[i].categoryJSON.indexOf('pizza') !== -1) {
            myCategories.pizza.push(restaurantMenuItems[i])
            foundItem = true;
        }
        if (restaurantMenuItems[i].categoryJSON.indexOf('pasta') !== -1) {
            myCategories.pasta.push(restaurantMenuItems[i])
            foundItem = true;
        }
        if (restaurantMenuItems[i].categoryJSON.indexOf('entree') !== -1) {
            myCategories.entree.push(restaurantMenuItems[i])
            foundItem = true;
        }
        if (restaurantMenuItems[i].categoryJSON.indexOf('dessert') !== -1) {
            myCategories.dessert.push(restaurantMenuItems[i])
            foundItem = true;
        }
        if (restaurantMenuItems[i].categoryJSON.indexOf('drinks') !== -1) {
            myCategories.drinks.push(restaurantMenuItems[i])
            foundItem = true;
        }
        if (restaurantMenuItems[i].categoryJSON.indexOf('kids') !== -1) {
            myCategories.kids.push(restaurantMenuItems[i])
            foundItem = true;
        }
        if (!foundItem) {
            myCategories.notCatgorized.push(restaurantMenuItems[i])
        }
    }
    return myCategories
}

export default menuItemsWithCategories;