const sortMenuDays = async (myRestaurantsMenuDays, type) => {
    switch (type) {
        case 'title':
            // sort by title
            myRestaurantsMenuDays.sort(function (a, b) {
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
            break;
        case 'price':
            // sort by price
            myRestaurantsMenuDays.sort(function (a, b) {
                return a.price - b.price;
            });
            break;
        default:
    }
    // console.log(myRestaurantsMenuDays);
    return myRestaurantsMenuDays;
}

export default sortMenuDays