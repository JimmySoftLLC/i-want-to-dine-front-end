function blobDataUrl(dataURL: string) {
    const BASE64_MARKER = ';base64,';
    const parts = dataURL.split(BASE64_MARKER);
    const contentType = parts[0].split(':')[1];
    const raw = window.atob(parts[1]);
    const rawLength = raw.length;
    const uInt8Array = new Uint8Array(rawLength);
    for (let i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i);
    }
    return new Blob([uInt8Array], { type: contentType });
}

const convertDataUrlToBlob = async (dataURL: string, fileName: string) => {
    dataURL = dataURL.replace('application/octet-stream', 'image/jpeg')
    let myBlob: any = blobDataUrl(dataURL);
    myBlob.lastModifiedDate = new Date();
    myBlob.name = fileName;
    return myBlob;
}

export default convertDataUrlToBlob;