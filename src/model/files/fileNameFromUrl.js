const fileNameFromUrl = (myUrl) => {
    let myParsedFile = myUrl.split("/")
    if (myParsedFile.length > 0) {
        return myParsedFile[myParsedFile.length - 1];
    } else {
        return null;
    }
}

export default fileNameFromUrl;