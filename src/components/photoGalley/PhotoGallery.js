import React, { Fragment, useContext } from "react";
import Gallery from "react-photo-gallery";
import SelectedImage from "./SelectedImage";
import DataAndMethodsContext from '../../context/dataAndMethods/dataAndMethodsContext';

const PhotoGallery = () => {
    const dataAndMethodsContext = useContext(DataAndMethodsContext);
    const {
        photos,
    } = dataAndMethodsContext;

    console.log(photos)

    // setting photos to int, react photo gallery would come up with errors that width
    // or height were strings, which they were not, but this seems to get rid of the error
    for (let i = 0; i < photos.length; i++) {
        photos[i].width = parseInt(photos[i].width)
        photos[i].height = parseInt(photos[i].height)
    }

    const imageRenderer = (
        { index, left, top, key, photo }) => (
            <SelectedImage
                selected={false}
                key={key}
                margin={"2px"}
                index={index}
                photo={photo}
                left={left}
                top={top}
            />
        );

    return (
        <Fragment>
            <Gallery photos={photos} renderImage={imageRenderer} />
        </Fragment >
    );
};

export default PhotoGallery;