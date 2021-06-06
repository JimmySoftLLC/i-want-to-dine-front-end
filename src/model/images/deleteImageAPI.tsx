import s3DeleteObject from '../../api/s3DeleteObject';
import consoleLogTimeElasped from '../consoleLogTimeElasped';
import fileNameFromUrl from '../files/fileNameFromUrl';

const deleteImageAPI = async (myImageUrl: string, myIdToken: any, myCustomId: any) => {
    try {
        let myKey = fileNameFromUrl(myImageUrl);
        let myTimer = new consoleLogTimeElasped("Delete object lambda")
        let myResult = await s3DeleteObject(myKey, myIdToken, myCustomId);
        myTimer.timeElasped();
        return myResult;
    } catch (err) {
        console.log(err);
        return null;
    }
}

export default deleteImageAPI;