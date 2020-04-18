import stringToHex from './stringToHex';
import hexToString from './hexToString';

const validEmail = (email) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        let myHexKey = stringToHex(email)
        let myHexKeyDecoded = hexToString(myHexKey)
        if (myHexKeyDecoded === email) {
            return true;
        }
    }
    return false;
}

export default validEmail;