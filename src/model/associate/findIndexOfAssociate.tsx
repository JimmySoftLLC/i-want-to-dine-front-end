const findIndexOfAssociate = (myAssociates, myId) => {
    for (let i = 0; i < myAssociates.length; i++) {
        if (myAssociates[i].id === myId) {
            return i;
        }
    }
    return -1;
}

export default findIndexOfAssociate