import Storage from '@aws-amplify/storage';
import consoleLogTimeElasped from '../consoleLogTimeElasped'

const uploadImageStorage = async (blob: { type: any; }, myId: string) => {
    try {
        let myTimer = new consoleLogTimeElasped("Upload time amplify")
        let myResult = await Storage.put(myId,
            blob,
            {
                level: 'public',
                contentType: blob.type
            })
        myTimer.timeElasped()
        return myResult
    } catch (error) {
        console.log(error)
        return null
    }
}

export default uploadImageStorage;