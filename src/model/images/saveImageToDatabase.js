import uploadImageStorage from '../images/uploadImageStorage';
import compressImage from '../images/compressImage';
import deleteImageAPI from '../images/deleteImageAPI';
import fileNameFromUrl from '../files/fileNameFromUrl';
import {
    blankImage,
} from '../../api/apiConstants';

const saveImageToDatabase = async (deleteFileName, imageUrl, blob, editMode, idToken, customId) => {
    if (deleteFileName) {
        await deleteImageAPI(deleteFileName, idToken, customId)
    }
    if (editMode !== "none" && imageUrl !== blankImage) {
        try {
            const compressedFile = await compressImage(blob);
            let myFileName = fileNameFromUrl(imageUrl)
            if (compressedFile) {
                await uploadImageStorage(blob, fileNameFromUrl(myFileName))
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export default saveImageToDatabase;