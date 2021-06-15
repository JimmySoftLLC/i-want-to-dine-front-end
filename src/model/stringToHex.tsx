const stringToHex = (myString: any) => {
    let hex;
    let result = "";
    for (let i = 0; i < myString.length; i++) {
        hex = myString.charCodeAt(i).toString(16);
        result += ("0000" + hex).slice(-2);
    }
    return result;
}
export default stringToHex
