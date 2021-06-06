import React, { useContext } from 'react';
import PhotoCardInventory from './PhotoCardInventory';
import DataAndMethodsContext from '../../context/dataAndMethods/dataAndMethodsContext';
import CircularIndeterminate from '../circularIndeterminate/CircularIndeterminate';

const PhotosInventory = () => {
    const dataAndMethodsContext: any = useContext(DataAndMethodsContext);
    const {
        restaurantPhotos,
        loading,
    } = dataAndMethodsContext;

    if (loading) {
        return <CircularIndeterminate />;
    } else {
        return (
            <div className='grid-4'>
                {(restaurantPhotos.map((Photo: { src: any; }) => <PhotoCardInventory Photo={Photo}
                    key={Photo.src}
                />))}
            </div>
        );
    }
};

export default PhotosInventory;