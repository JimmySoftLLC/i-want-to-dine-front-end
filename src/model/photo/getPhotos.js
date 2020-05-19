const getPhotos = async (restaurants) => {
    // create an array of all ids
    let myPhotos = [];
    for (let i = 0; i < restaurants.length; i++) {
        if (restaurants[i].approved) {
            for (let j = 0; j < restaurants[i].photosJSON.count; j++) {
                myPhotos.push(restaurants[i].photosJSON[j])
            }
        }
    }
    myPhotos = [
        {
            src: "https://iwanttodine.s3.amazonaws.com/public/39c40e02-876e-4f4d-9d42-b2d9551df046.jpg",
            width: 4,
            height: 3,
            caption: "This crazy dog is everywhere",
            restaurantid: "fd249f9b-d03f-4c5b-8359-20b1b6f149fe",
        },
        {
            src: "https://iwanttodine.s3.amazonaws.com/public/f4db96d8-247e-4b1f-a863-46ec163beff6.jpg",
            width: 3,
            height: 4,
            caption: "This lady has everything under control",
            restaurantid: "fd249f9b-d03f-4c5b-8359-20b1b6f149fe",
        },
        {
            src: "https://iwanttodine.s3.amazonaws.com/public/5369ba7c-b856-4915-b314-e0395e790b92.jpg",
            width: 4,
            height: 2,
            caption: "This monster is really a nice guy inside.",
            restaurantid: "fd249f9b-d03f-4c5b-8359-20b1b6f149fe",
        },
        {
            src: "https://iwanttodine.s3.amazonaws.com/public/45be44cc-54e0-4d2d-a82f-8314658aa6d8.jpg",
            width: 4,
            height: 3,
            caption: "This guy can't be trusted.",
            restaurantid: "fd249f9b-d03f-4c5b-8359-20b1b6f149fe",
        },
        {
            src: "https://iwanttodine.s3.amazonaws.com/public/eba56760-6436-4dac-9f63-f2c993a8522b.jpg",
            width: 4,
            height: 3,
            caption: "Pretty in pink is a nick name for this employee.",
            restaurantid: "fd249f9b-d03f-4c5b-8359-20b1b6f149fe",
        },
    ];
    return myPhotos;
}

export default getPhotos;