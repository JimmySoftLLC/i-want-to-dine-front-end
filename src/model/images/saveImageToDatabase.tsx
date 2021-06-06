import uploadImageStorage from '../images/uploadImageStorage';
import compressImage from '../images/compressImage';
import deleteImageAPI from '../images/deleteImageAPI';
import fileNameFromUrl from '../files/fileNameFromUrl';
import {
    blankImage,
} from '../../api/apiConstants';

const saveImageToDatabase = async (deleteFileName: string, imageUrl: string, blob: any, editMode: string, idToken: any, customId: any) => {
    if (deleteFileName) {
        await deleteImageAPI(deleteFileName, idToken, customId)
    }
    if (editMode !== "none" && imageUrl !== blankImage) {
        try {
            const compressedFile = await compressImage(blob);
            let myFileName: any = fileNameFromUrl(imageUrl)
            if (compressedFile) {
                await uploadImageStorage(blob, fileNameFromUrl(myFileName))
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export default saveImageToDatabase;