const getCoordinates = () => {
    return new Promise(function (resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
}

const getLocation = async () => {
    try {
        const position = await getCoordinates();
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;
        const location = { latitude: latitude, longitude: longitude }
        return location;
    } catch (error) {
        return error;
    }
}

export default getLocation