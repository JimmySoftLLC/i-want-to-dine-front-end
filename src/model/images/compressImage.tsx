import imageCompression from 'browser-image-compression';

const compressImage = async (imageFile: any) => {
    // console.log(`originalFile size ${imageFile.size / 1024} KB`);
    const options = {
        maxSizeMB: .500,
        maxWidthOrHeight: 1920,
        useWebWorker: false
    }
    try {
        const compressedFile = await imageCompression(imageFile, options);
        // console.log(`compressedFile size ${compressedFile.size / 1024} KB`);
        return compressedFile;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export default compressImage;