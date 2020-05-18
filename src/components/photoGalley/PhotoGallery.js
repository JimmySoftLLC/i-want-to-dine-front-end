import React, { Fragment } from "react";
import Gallery from "react-photo-gallery";

const PhotoGallery = () => {
    const photos = [
        {
            src: "https://images.squarespace-cdn.com/content/v1/59c007d9e3df283147c88259/1557249010912-6O14VP50JWB4K4G8R0S9/ke17ZwdGBToddI8pDm48kLkXF2pIyv_F2eUT9F60jBl7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0iyqMbMesKd95J-X4EagrgU9L3Sa3U8cogeb0tjXbfawd0urKshkc5MgdBeJmALQKw/BLE275~1.JPG?format=300w",
            width: 4,
            height: 3
        },
        {
            src: "https://images.squarespace-cdn.com/content/v1/59c007d9e3df283147c88259/1506595093756-2T6JLTX6RFDNYO2GFLK4/ke17ZwdGBToddI8pDm48kB80eW4KK5wgMfkTp6SjTNtZw-zPPgdn4jUwVcJE1ZvWQUxwkmyExglNqGp0IvTJZUJFbgE-7XRK3dMEBRBhUpzTXHTNWbLxHgxVyDKGkm0m7dwXH93cJjf-6FZY4-J-lE8gQG5HmOjeNsDOb3A3BPQ/bluecoast_rehoboth_sodel_concepts_delaware_36.png?format=300w",
            width: 1,
            height: 1
        },
        // {
        //     src: "https://images.squarespace-cdn.com/content/v1/59c007d9e3df283147c88259/1506593427487-JZFWIDCKFM8DXMMJQGUM/ke17ZwdGBToddI8pDm48kPqQfq0L3n3wpHIsRapTfg8UqsxRUqqbr1mOJYKfIPR7LoDQ9mXPOjoJoqy81S2I8N_N4V1vUb5AoIIIbLZhVYxCRW4BPu10St3TBAUQYVKcpZFgonhpUjQuR9UY_f4FRv01MfGGW-Q2SKIZAaCvwbmMH1mhS07BCLTJvtZLtrKj/bluecoast_rehoboth_sodel_concepts_delaware_30.png?format=500w",
        //     width: 1,
        //     height: 1
        // },
        {
            src: "https://images.squarespace-cdn.com/content/v1/59c007d9e3df283147c88259/1506601468439-DU849NM904QL7O43SDPV/ke17ZwdGBToddI8pDm48kB80eW4KK5wgMfkTp6SjTNtZw-zPPgdn4jUwVcJE1ZvWQUxwkmyExglNqGp0IvTJZUJFbgE-7XRK3dMEBRBhUpzTXHTNWbLxHgxVyDKGkm0m7dwXH93cJjf-6FZY4-J-lE8gQG5HmOjeNsDOb3A3BPQ/bluecoast_rehoboth_sodel_concepts_delaware_57.jpg?format=300w",
            width: 3,
            height: 4
        },
        {
            src: "https://images.squarespace-cdn.com/content/v1/59c007d9e3df283147c88259/1506607642635-BFLJD2WHVH2V8TVHXLPV/ke17ZwdGBToddI8pDm48kFQQgP34qnCpeHaeAOzTt7pZw-zPPgdn4jUwVcJE1ZvWQUxwkmyExglNqGp0IvTJZamWLI2zvYWH8K3-s_4yszcp2ryTI0HqTOaaUohrI8PIedjZT6_OBzi2ofH1EqNdNeCRxNMlbxs9807lIebBlcA/bluecoast_rehoboth_sodel_concepts_delaware_34.png?format=300w",
            width: 4,
            height: 4
        },
        {
            src: "https://source.unsplash.com/NQSWvyVRIJk/800x599",
            width: 4,
            height: 3
        },
        {
            src: "https://source.unsplash.com/zh7GEuORbUw/600x799",
            width: 3,
            height: 4
        },
        {
            src: "https://source.unsplash.com/PpOHJezOalU/800x599",
            width: 4,
            height: 3
        },
        {
            src: "https://source.unsplash.com/I1ASdgphUH4/800x599",
            width: 4,
            height: 3
        },
        {
            src: "https://source.unsplash.com/2ShvY8Lf6l0/800x599",
            width: 4,
            height: 3
        },
        {
            src: "https://source.unsplash.com/Dm-qxdynoEc/800x799",
            width: 1,
            height: 1
        },
        {
            src: "https://source.unsplash.com/qDkso9nvCg0/600x799",
            width: 3,
            height: 4
        },
        {
            src: "https://source.unsplash.com/iecJiKe_RNg/600x799",
            width: 3,
            height: 4
        },
        {
            src: "https://source.unsplash.com/epcsn8Ed8kY/600x799",
            width: 3,
            height: 4
        },
        {
            src: "https://source.unsplash.com/NQSWvyVRIJk/800x599",
            width: 4,
            height: 3
        },
        {
            src: "https://source.unsplash.com/zh7GEuORbUw/600x799",
            width: 3,
            height: 4
        },
        {
            src: "https://source.unsplash.com/PpOHJezOalU/800x599",
            width: 4,
            height: 3
        },
        {
            src: "https://source.unsplash.com/I1ASdgphUH4/800x599",
            width: 4,
            height: 3
        },
        {
            src: "https://source.unsplash.com/XiDA78wAZVw/600x799",
            width: 3,
            height: 4
        },
        {
            src: "https://source.unsplash.com/x8xJpClTvR0/800x599",
            width: 4,
            height: 3
        },
        {
            src: "https://source.unsplash.com/qGQNmBE7mYw/800x599",
            width: 4,
            height: 3
        },
        {
            src: "https://source.unsplash.com/NuO6iTBkHxE/800x599",
            width: 4,
            height: 3
        },
        {
            src: "https://source.unsplash.com/pF1ug8ysTtY/600x400",
            width: 4,
            height: 3
        },
        {
            src: "https://source.unsplash.com/A-fubu9QJxE/800x533",
            width: 4,
            height: 3
        },
        {
            src: "https://source.unsplash.com/5P91SF0zNsI/740x494",
            width: 4,
            height: 3
        },
    ];

    // columns={columns}
    return (
        <Fragment>
            <Gallery photos={photos} direction={"column"} />
        </Fragment >
    );
};

export default PhotoGallery;