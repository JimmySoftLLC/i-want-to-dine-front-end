const hexToString = (myString) => {
    let hexes = myString.match(/.{1,2}/g) || [];
    let result = "";
    for (let j = 0; j < hexes.length; j++) {
        result += String.fromCharCode(parseInt(hexes[j], 16));
    }
    return result;
}

export default hexToString