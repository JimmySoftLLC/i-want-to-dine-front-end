import Storage from '@aws-amplify/storage';

const uploadImage = async (blob, myId) => {
    try {
        let myResult = await Storage.put(myId,
            blob,
            {
                level: 'public',
                contentType: blob.type
            })
        return myResult
    } catch (error) {
        console.log(error)
        return null
    }
}

export default uploadImage;