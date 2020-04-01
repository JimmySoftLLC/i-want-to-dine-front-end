const sortAssociates = async (myAssociates, myStates) => {
    if (myStates['sortName'] || myStates === 'sortName') {
        // sort by title
        myAssociates.sort(function (a, b) {
            var textA = a.firstName.toUpperCase(); // ignore upper and lowercase
            var textB = b.firstName.toUpperCase(); // ignore upper and lowercase
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
    // console.log(myAssociates);
    return myAssociates;
}

export default sortAssociates