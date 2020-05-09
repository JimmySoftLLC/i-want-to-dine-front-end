import Storage from '@aws-amplify/storage';

const downloadImageAPI = async (myId) => {
    try {
        let myResult = await Storage.get(myId, { level: 'public', download: true })
        return myResult
    } catch (error) {
        console.log(error)
        return null
    }
}

export default downloadImageAPI;