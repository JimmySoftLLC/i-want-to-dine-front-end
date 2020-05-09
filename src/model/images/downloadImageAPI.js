import fileNameFromUrl from '../files/fileNameFromUrl';
import s3GetObject from '../../api/s3GetObject';
// import consoleLogTimeElasped from '../consoleLogTimeElasped';

const getDataFromBlob = (myBlob) => {
    return new Promise((resolve, reject) => {
        let reader = new FileReader();
        reader.onload = () => {
            resolve(reader.result);
        };
        reader.onerror = reject;
        reader.readAsDataURL(myBlob);
    })
}

const downloadImageAPI = async (myImageUrl, myIdToken, myCustomId) => {
    try {
        let myFile = fileNameFromUrl(myImageUrl);
        // let myTimer = new consoleLogTimeElasped('Lambda func time')
        let myResult = await s3GetObject(myFile, myIdToken, myCustomId);
        // myTimer.timeElasped()
        let myBlob = new Blob([new Uint8Array(myResult.payload.Body.data).buffer]);
        let myImageData = await getDataFromBlob(myBlob);
        return myImageData;
    } catch (err) {
        console.log(err);
        return null;
    }
}

export default downloadImageAPI;