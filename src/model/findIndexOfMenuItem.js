const findIndexOfMenuItem = (MyMenuItems, myId) => {
    for (let i = 0; i < MyMenuItems.length; i++) {
        if (MyMenuItems[i].id === myId) {
            return i;
        }
    }
    return -1;
}

export default findIndexOfMenuItem