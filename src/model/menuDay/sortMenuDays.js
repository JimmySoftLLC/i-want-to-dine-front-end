const sortMenuDays = async (myMenuDays, myStates) => {
    // console.log(myStates)
    if (myStates['sortDate'] || myStates === 'sortDate') {
        // sort by date
        myMenuDays.sort(function (a, b) {
            return a.dateFrom - b.dateFrom;
        });
    }
    if (myStates['sortTitle'] || myStates === 'sortTitle') {
        // sort by title
        myMenuDays.sort(function (a, b) {
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
    // console.log(myRestaurantsMenuDays);
    return myMenuDays;
}

export default sortMenuDays