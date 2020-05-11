const sortEntertainmentItems = async (myEntertainmentItems, myStates) => {
    if (myStates['sortTitle'] || myStates === 'sortTitle') {
        // sort by title
        myEntertainmentItems.sort(function (a, b) {
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
    if (myStates['sortTime'] || myStates === 'sortTime') {
        // sort by time
        myEntertainmentItems.sort(function (a, b) {
            return a.timeFrom - b.timeFrom;
        });
    }

    // console.log(myEntertainmentItems);
    return myEntertainmentItems;
}

export default sortEntertainmentItems