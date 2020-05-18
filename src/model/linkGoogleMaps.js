const linkGoogleMaps = (myRestaurant) => {
    let myLinkGoogleMaps = "https://www.google.com/maps/place/" + myRestaurant.street + "," + myRestaurant.city + "," + myRestaurant.zipCode;
    myLinkGoogleMaps = myLinkGoogleMaps.replace(/ /g, "+")
    return myLinkGoogleMaps;
}

export default linkGoogleMaps