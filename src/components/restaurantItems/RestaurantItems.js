import React, { useContext } from 'react';
import RestaurantItemCard from './RestaurantItemCard';
import DataAndMethodsContext from '../../context/dataAndMethods/dataAndMethodsContext';

const RestaurantItems = () => {
    const dataAndMethodsContext = useContext(DataAndMethodsContext);
    const { resturants } = dataAndMethodsContext;

    return resturants.map(resturantItem => <RestaurantItemCard
        restuarantItem={resturantItem}
        myStates={dataAndMethodsContext.myStates}
        handleClickResturantEdit={dataAndMethodsContext.handleClickResturantEdit}
        handleClickResturantCopy={dataAndMethodsContext.handleClickResturantCopy}
        handleClickResturantDelete={dataAndMethodsContext.handleClickResturantDelete}
        key={resturantItem.id} />);
};

export default RestaurantItems;