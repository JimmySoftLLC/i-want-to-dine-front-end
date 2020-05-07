import fileNameFromUrl from '../files/fileNameFromUrl';
import downloadImage from './downloadImage';
import s3GetObject from '../../api/s3GetObject';

// const getBlobFromUrl = (myImageUrl) => {
//     // console.log(myImageUrl);
//     return new Promise((resolve, reject) => {
//         let request = new XMLHttpRequest();
//         request.open('GET', myImageUrl, true);
//         request.setRequestHeader('X-PINGOTHER', 'pingpong');
//         request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
//         // request.setRequestHeader("Access-Control-Allow-Origin", '*')
//         request.responseType = 'blob';
//         request.onload = () => {
//             resolve(request.response);
//         };
//         request.onerror = reject;
//         request.send();
//     })
// }

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

const convertUrlToImageData = async (myImageUrl, myIdToken, myCustomId) => {
    try {
        let myFile = fileNameFromUrl(myImageUrl);
        let myDate = new Date()
        let timeElasped = new Date()
        let myResult = await s3GetObject(myFile, myIdToken, myCustomId);
        timeElasped = new Date() - myDate; myDate = new Date(); console.log('Lambda func time: ', timeElasped);
        let myBlob = new Blob([new Uint8Array(myResult.payload.Body.data).buffer]);
        // console.log(myBlob);
        // let myBlob = await getBlobFromUrl(myImageUrl);
        // console.log(myBlob)
        let myImageData = await getDataFromBlob(myBlob);
        // console.log(myImageData)
        return myImageData;
    } catch (err) {
        console.log(err);
        return null;
    }
}

export default convertUrlToImageData;