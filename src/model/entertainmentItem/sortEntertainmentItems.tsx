const sortEntertainmentItems = async (myEntertainmentItems: any, myStates: any) => {
    if (myStates['sortTitle'] || myStates === 'sortTitle') {
        // sort by title
        myEntertainmentItems.sort(function (a: { title: string; }, b: { title: string; }) {
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
        myEntertainmentItems.sort(function (a: { timeFrom: number; }, b: { timeFrom: number; }) {
            return a.timeFrom - b.timeFrom;
        });
    }

    // console.log(myEntertainmentItems);
    return myEntertainmentItems;
}

export default sortEntertainmentItems