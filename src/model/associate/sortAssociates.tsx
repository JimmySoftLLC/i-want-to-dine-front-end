const sortAssociates = (associates, associate) => {
    let myAssociates = JSON.parse(JSON.stringify(associates))
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

    // put logged in associate at the begining of the array
    if (associate) {
        let myIndex = myAssociates.findIndex(item => item.id === associate.id);
        let mySlicedAssociate = myAssociates.splice(myIndex, 1)
        myAssociates.unshift(mySlicedAssociate[0])
    }

    // console.log(myAssociates);
    return myAssociates;
}

export default sortAssociates