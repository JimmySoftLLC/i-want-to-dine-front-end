import Storage from '@aws-amplify/storage';

const uploadImageStorage = async (blob, myId) => {
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

export default uploadImageStorage;