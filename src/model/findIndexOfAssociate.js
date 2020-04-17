const findIndexOfAssociate = (MyAssociates, myId) => {
    for (let i = 0; i < MyAssociates.length; i++) {
        if (MyAssociates[i].id === myId) {
            return i;
        }
    }
    return -1;
}

export default findIndexOfAssociate