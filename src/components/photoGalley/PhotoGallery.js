import React, { Fragment, useContext } from "react";
import Gallery from "react-photo-gallery";
import SelectedImage from "./SelectedImage";
import DataAndMethodsContext from '../../context/dataAndMethods/dataAndMethodsContext';

const PhotoGallery = () => {
    const dataAndMethodsContext = useContext(DataAndMethodsContext);
    const {
        photos,
    } = dataAndMethodsContext;

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