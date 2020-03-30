const sortMenuItems = async (myRestaurantsMenuItems, myStates) => {
    if (myStates['sortTitle'] || myStates === 'sortTitle') {
        // sort by title
        myRestaurantsMenuItems.sort(function (a, b) {
            var textA = a.title.toUpperCase(); // ignore upper and lowercase
            var textB = b.title.toUpperCase(); // ignore upper and lowercase
            if (textA < textB) {
                return -1;
            }
            if (textA > textB) {
                return 1;
            }
            // names must be equal
            return 0;
        });
    }
    if (myStates['sortPrice'] || myStates === 'sortPrice') {
        // sort by price
        myRestaurantsMenuItems.sort(function (a, b) {
            return a.price - b.price;
        });
    }
    // console.log(myRestaurantsMenuItems);
    return myRestaurantsMenuItems;
}

export default sortMenuItems